import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import connectDB from './db.js';
import { setupAuthRoutes } from './auth.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
let server;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Setup authentication routes
setupAuthRoutes(app);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Protected route example
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
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
