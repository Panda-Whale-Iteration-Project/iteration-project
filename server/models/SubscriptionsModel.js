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
        'Entertainment', // Netflix, Spotify, Disney+, etc.
        'Productivity', // Microsoft 365, Adobe CC, etc.
        'Utilities', // AWS, hosting services, etc.
        'Gaming',
        'Education',
        'Health and fitness', // Peloton, MyFitnessPal Premium, etc.
        'News and media', // NYTimes, WSJ, etc.
        'Shopping', // Amazon Prime, Costco, etc.
        'Social media', // LinkedIn Premium, Twitter Blue, etc.
        'Security',
        'Storage',
        'Food delivery', // DoorDash, Uber Eats Pass, etc.
        'Other', // Catch-all for misc subscriptions
      ],
      default: 'other',
    },
    notifyDaysBefore: {
      type: Number,
      default: 3,
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
