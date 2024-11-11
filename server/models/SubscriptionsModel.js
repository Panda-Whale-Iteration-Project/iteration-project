import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    serviceName: {
      type: String,
      required: [true, 'Service name is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Subscription amount is required'],
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'inactive'],
    },
    billingCycle: {
      type: String,
      required: true,
      default: 'monthly',
      enum: ['monthly', 'yearly', 'weekly'],
    },
    nextPaymentDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'entertainment', // Netflix, Spotify, Disney+, etc.
        'productivity', // Microsoft 365, Adobe CC, etc.
        'utilities', // AWS, hosting services, etc.
        'gaming', // Xbox Game Pass, PlayStation Plus, etc.
        'education', // Coursera, Udemy, etc.
        'health_fitness', // Peloton, MyFitnessPal Premium, etc.
        'news_media', // NYTimes, WSJ, etc.
        'shopping', // Amazon Prime, Costco, etc.
        'social_media', // LinkedIn Premium, Twitter Blue, etc.
        'security', // VPN services, password managers, etc.
        'food_delivery', // DoorDash, Uber Eats Pass, etc.
        'storage', // Google Drive, Dropbox, iCloud, etc.
        'other', // Catch-all for misc subscriptions
      ],
      default: 'other',
    },
    notifyDaysBefore: {
      type: Number,
      default: 3,
    },
    lastNotificationSent: {
      type: Date,
      default: null,
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

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
