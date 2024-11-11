import Subscription from '../models/SubscriptionsModel.js';

const subscriptionController = {};

// subscriptionController middlewares

//create a new subscription for a given user
subscriptionController.createSubscription = async (req, res, next) => {
	const {
		userId,
		serviceName,
		amount,
		status,
		billingCycle,
		nextPaymentDate,
		category,
		notifyDaysBefore,
	} = req.body;

	try {
		const newSub = await Subscription.create({
			userId,
			serviceName,
			amount,
			status,
			billingCycle,
			nextPaymentDate,
			category,
			notifyDaysBefore,
		});
		//will return the new subscription
		res.locals.newSub = newSub;
		return next();
	} catch (err) {
		return next({
			log: "Error in 'createSubscription' middleware: " + err,
			status: 500,
			message: { err: 'An error occurred while creating a new subscription' },
		});
	}
	try {
		const newSub = await Subscription.create({
			userId,
			serviceName,
			amount,
			status,
			billingCycle,
			nextPaymentDate,
			category,
			notifyDaysBefore,
		});
		//will return the new subscription
		res.locals.newSub = newSub;
		return next();
	} catch (err) {
		return next({
			log: "Error in 'createSubscription' middleware: " + err,
			status: 500,
			message: { err: 'An error occurred while creating a new subscription' },
		});
	}
};

//update existing subscription by subscription ID
subscriptionController.updateSubscription = async (req, res, next) => {
	const { _id } = req.params;
	const {
		serviceName,
		amount,
		status,
		billingCycle,
		nextPaymentDate,
		category,
		notifyDaysBefore,
	} = req.body;

	try {
		const updatedSub = await Subscription.findByIdAndUpdate(
			_id,
			{
				serviceName,
				amount,
				status,
				billingCycle,
				nextPaymentDate,
				category,
				notifyDaysBefore,
			},
			{ new: true }
		);
		//will return the updated subscription details
		res.locals.updatedSub = updatedSub;
		return next();
	} catch (err) {
		return next({
			log: "Error in 'updateSubscription' middleware: " + err,
			status: 500,
			message: { err: 'An error occurred while updating subscription' },
		});
	}
	try {
		const updatedSub = await Subscription.findByIdAndUpdate(
			_id,
			{
				serviceName,
				amount,
				status,
				billingCycle,
				nextPaymentDate,
				category,
				notifyDaysBefore,
			},
			{ new: true }
		);
		//will return the updated subscription details
		res.locals.updatedSub = updatedSub;
		return next();
	} catch (err) {
		return next({
			log: "Error in 'updateSubscription' middleware: " + err,
			status: 500,
			message: { err: 'An error occurred while updating subscription' },
		});
	}
};

//delete specific subscription based on subscription ID
subscriptionController.deleteSubscription = async (req, res, next) => {
	const { _id } = req.params;

	try {
		const deletedSub = Subscription.findByIdAndDelete(_id);
		res.locals.deletedSub = deletedSub;
		return next();
	} catch (err) {
		return next({
			log: "Error in 'deleteSubscription' middleware: " + err,
			status: 500,
			message: { err: 'An error occurred while deleting subscription' },
		});
	}
	try {
		const deletedSub = Subscription.findByIdAndDelete(_id);
		res.locals.deletedSub = deletedSub;
		return next();
	} catch (err) {
		return next({
			log: "Error in 'deleteSubscription' middleware: " + err,
			status: 500,
			message: { err: 'An error occurred while deleting subscription' },
		});
	}
};

export default subscriptionController;
