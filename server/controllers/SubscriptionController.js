const Subscriptions = require('../models/SubscriptionsModel');

const subscriptionController = {};

// subscriptionController middlewares
subscriptionController.createSubscription = async (req, res, next) => {

  const { serviceName, renewalDate, notifyDate, price, category, details } = req.body;
  
  try {
    const newSub = await Subscriptions.create({ serviceName, renewalDate, notifyDate, price, category, details });
    res.locals.newSub = newSub;
    return next();
  } 
  
  catch(err) {
    return next ({
      log: 'Error in \'createSubscription\' middleware: ' + err,
      status: 500,
      message: { err: 'An error occurred while creating new subscription'}
    });
  };
};

subscriptionController.updateSubscription = async (req, res, next) => {
  const { _id } = req.params;
  const { serviceName, renewalDate, notifyDate, price, category, details } = req.body;

  try {
    const updatedSub = await Subscriptions.findByIdAndUpdate(_id, { serviceName, renewalDate, notifyDate, price, category, details }, { new: true });

    res.locals.updatedSub = updatedSub;
    return next();
  }

  catch(err) {
    return next ({
      log: 'Error in \'updateSubscription\' middleware: ' + err,
      status: 500,
      message: { err: 'An error occurred while updating subscription' } 
    });
  };
};

subscriptionController.deleteSubscription = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const deletedSub = Subscriptions.findByIdAndDelete(_id);
    res.locals.deletedSub = deletedSub;
    return next();
  }

  catch(err) {
    return next ({
      log: 'Error in \'deleteSubscription\' middleware: ' + err,
      status: 500,
      message: { err: 'An error occurred while deleting subscription'}
    });
  };
};

module.exports = subscriptionController;
