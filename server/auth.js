// auth.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

// User Schema
const userSchema = new mongoose.Schema({
	googleId: String,
	email: String,
	displayName: String,
	firstName: String,
	lastName: String,
	profilePhoto: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);

// Serialize user for the session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
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
				// Check if user already exists
				let user = await User.findOne({ googleId: profile.id });

				if (user) {
					console.log('✅ Existing user logged in:', user.email);
					return done(null, user);
				}

				// If not, create new user
				user = await User.create({
					googleId: profile.id,
					email: profile.emails[0].value,
					displayName: profile.displayName,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					profilePhoto: profile.photos[0].value,
				});

				console.log('✅ New user created:', user.email);
				done(null, user);
			} catch (err) {
				console.error('❌ Error in Google Strategy:', err);
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
		(req, res) => {
			console.log('✅ Google OAuth callback successful');
			res.redirect('/dashboard');
		}
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

export { setupAuthRoutes, User };
