const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const trialSchema = new Schema ({
  _id: Schema.Types.ObjectId, // _id is defined here in order to be referred in User and populate() later
  trialName: {
    type: String,
    required: [true, 'Trial\'s name is required']
  },
  expDate: {
    type: Date,
    required: [true, 'Expiration date is required']
  },
  notifyDate: {
    type: Date,
    required: [true, 'Date to notify expiration is required']
  },
  subCost: Number,
  category: String,
  detail: String
});

const Trials = model('Trials', trialSchema);

module.exports = Trials;