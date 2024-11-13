import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import connectDB from './db.js';
import { setupAuthRoutes } from './auth.js';
import dotenv from 'dotenv';
import { UserLogin } from './auth.js';
import User from './models/UserModel.js';
import cors from 'cors';

//require routes files
import userRouter from './routes/userRoute.js';
import trialRouter from './routes/trialRoute.js';
import subscriptionRouter from './routes/subscriptionRoute.js';

import notificationService from './notifs.js';

const app = express();
mongoose.set('strictQuery', true);

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // or whatever port your Vite React app is running on
    credentials: true, // this is important for cookies/sessions
  })
);

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route Handlers
app.use('/user', userRouter);
app.use('/subscription', subscriptionRouter);
app.use('/trial', trialRouter);

// Session configuration - user session stored in cookie for 24 hours
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
      httpOnly: true,
    },
  })
);

// Initialize Passport and restore authentication state from session
// Passport is the Node.js authentication library being used to manage user login sessions.
app.use(passport.initialize());
app.use(passport.session());

// Setup authentication routes
setupAuthRoutes(app);

// Basic route for testing
app.get('/', (_req, res) => {
  res.send('Server is running');
});

// Protected route example for testing
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: req.user,
      message: 'Welcome to your dashboard!',
    });
  } else {
    res.redirect('/auth/google');
  }
});

// Unknown Route Handler
app.use('*', (_req, res) => {
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  const defaultErr = {
    log: 'Error occurred at unknown middleware',
    status: 500,
    message: { err: 'An Error occurred.' },
  };

  const customErr = Object.assign({}, defaultErr, err);
  console.error(customErr.log);
  return res.status(customErr.status).json(customErr.message);
});

// Start server
let server;

const PORT = process.env.PORT || 3000;
server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
  try {
    console.log('📥 Received shutdown signal');

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('💾 Database connection closed');

    // Close server
    server.close(() => {
      console.log('🔚 Server closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

export default app;
