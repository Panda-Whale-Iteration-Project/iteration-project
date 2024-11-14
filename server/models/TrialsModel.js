import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const trialSchema = new Schema({
  _id: Schema.Types.ObjectId, // _id is defined here in order to be referred in User and populate() later
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  trialName: {
    type: String,
    required: [true, "Trial's name is required"],
  },
  expDate: {
    type: Date,
    required: [true, 'Expiration date is required'],
  },
  // notifyDate: {
  //   type: Date,
  //   required: [true, 'Date to notify expiration is required'],
  // },
  notifyDaysBefore: {
    type: Number,
    default: 3,
  },
  status: {
    type: String,
    required: true,
    default: 'Active',
    enum: ['Active', 'Inactive'],
  },
  subCost: Number,
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
    default: 'Other',
  },
  details: String,
});

const Trials = model('Trials', trialSchema);

export default Trials;
