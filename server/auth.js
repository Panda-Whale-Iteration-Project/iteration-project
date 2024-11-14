import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/UserModel.js';
import userRouter from './routes/userRoute.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    '❌ Missing required environment variables:',
    missingEnvVars.join(', ')
  );
  console.error('Please create a .env file with the required variables');
  process.exit(1);
}

// UserLogin Schema for authentication
const userLoginSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: String,
    firstName: String,
    lastName: String,
    profilePhoto: String,
    subscriptionUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const UserLogin = mongoose.model('UserLogin', userLoginSchema);

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, {
    authUserId: user.authUser.id,
    subscriptionUserId: user.subscriptionUser._id,
  });
});

// Deserialize user from the session
passport.deserializeUser(async (serializedUser, done) => {
  try {
    const authUser = await UserLogin.findById(serializedUser.authUserId);
    const subscriptionUser = await User.findById(
      serializedUser.subscriptionUserId
    );

    if (!authUser || !subscriptionUser) {
      return done(new Error('User not found'), null);
    }

    done(null, { authUser, subscriptionUser });
  } catch (err) {
    done(err, null);
  }
});

// Setup Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if authentication user already exists
        let authUser = await UserLogin.findOne({ googleId: profile.id });
        let subscriptionUser;

        if (authUser) {
          // Get the associated subscription user
          subscriptionUser = await User.findById(authUser.subscriptionUserId);
          if (!subscriptionUser) {
            return done(
              new Error('Associated subscription user not found'),
              null
            );
          }
          console.log('✅ Existing user logged in:', authUser.email);
          return done(null, { authUser, subscriptionUser });
        }

        // Check if a subscription user with this email already exists
        subscriptionUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!subscriptionUser) {
          // Create new subscription user if doesn't exist
          subscriptionUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          console.log(
            '✅ New subscription user created:',
            subscriptionUser.email
          );
        } else {
          console.log(
            '✅ Found existing subscription user:',
            subscriptionUser.email
          );
        }

        // Create new authentication user and link to subscription user
        authUser = await UserLogin.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profilePhoto: profile.photos[0].value,
          subscriptionUserId: subscriptionUser._id,
        });

        console.log('✅ New auth user created and linked to subscription user');
        done(null, { authUser, subscriptionUser });
      } catch (err) {
        console.error('❌ Error in Google Strategy:', err);
        if (err.code === 11000) {
          // Handle duplicate key error
          console.error('Email already exists in UserLogin collection');
          return done(
            new Error('Email already associated with another account'),
            null
          );
        }
        done(err, null);
      }
    }
  )
);

// Auth routes
const setupAuthRoutes = (app) => {
  // Initialize session middleware
  app.use(passport.session());

  // Google OAuth routes
  app.get(
    '/auth/google',
    (req, res, next) => {
      console.log('📍 Initiating Google OAuth login...');
      next();
    },
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res, next) => {
      // Add subscription user ID to request object
      // user.subscriptionUser._id
      req.subscriptionUserId = req.user.subscriptionUser._id;
      res.redirect('http://localhost:5173');
      // next();
    }
    // userRouter.getUser,
  );

  // Logout route
  app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('❌ Error during logout:', err);
        return res.status(500).json({ error: 'Error logging out' });
      }
      console.log('👋 User logged out successfully');
      res.redirect('/');
    });
  });

  // Test route to check authentication status
  app.get('/auth/status', (req, res) => {
    res.json({
      authenticated: req.isAuthenticated(),
      user: req.user,
    });
  });
};

export { setupAuthRoutes, UserLogin };
