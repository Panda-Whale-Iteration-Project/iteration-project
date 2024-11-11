import Subscription from '../models/SubscriptionsModel.js';

const subscriptionController = {};

// subscriptionController middlewares
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
    const newSub = await Subscriptions.create({
      userId,
      serviceName,
      amount,
      status,
      billingCycle,
      nextPaymentDate,
      category,
      notifyDaysBefore,
    });
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
    const updatedSub = await Subscriptions.findByIdAndUpdate(
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

subscriptionController.deleteSubscription = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const deletedSub = Subscriptions.findByIdAndDelete(_id);
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
