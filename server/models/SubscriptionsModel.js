const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subscriptionsSchema = new Schema({
	_id: Schema.Types.ObjectId, //_id is defined here in order to be referred to User and populate() later
	serviceName: {
		type: String,
		required: [true, "Service's name is required"],
	},
	renewalDate: {
		type: Date,
		required: [true, 'Renewal date is required'],
	},
	notifyDate: {
		type: Date,
		required: [true, 'Date to notify your renewal is required'],
	},
	price: {
		type: Number,
		required: [true, 'Subscription price is required'],
	},
	category: String,
	details: String,
});

const Subscriptions = model('Subscriptions', subscriptionsSchema);

module.exports = Subscriptions;
