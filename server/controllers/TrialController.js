import Trials from '../models/TrialsModel.js';

const trialController = {};

// trialController middlewares

//create new free trial for a given user ID (not currently hooked to front end)
trialController.createTrial = async (req, res, next) => {
  const { userId, trialName, expDate, notifyDate, subCost, category, detail } =
    req.body;

  try {
    const newTrial = Trials.create({
      userId,
      trialName,
      expDate,
      notifyDate,
      subCost,
      category,
      detail,
    });

    res.locals.newTrial = newTrial;
    return next();
  } catch (err) {
    return next({
      log: "Error in 'createTrial' middleware: " + err,
      status: 500,
      message: { err: 'An error occurred while creating a new trial' },
    });
  }
};

//update information for an existing trial based on trial ID (not currently hooked to front end)
trialController.updateTrial = async (req, res, next) => {
  const { _id } = req.params;
  const { trialName, expDate, notifyDate, subCost, category, detail } =
    req.body;

  try {
    const updatedTrial = await Trials.findByIdAndUpdate(
      _id,
      { trialName, expDate, notifyDate, subCost, category, detail },
      { new: true }
    );
    res.locals.updatedTrial = updatedTrial;
    return next();
  } catch (err) {
    return next({
      log: "Error in 'updateTrial' middleware",
      status: 500,
      message: { err: 'An error occurred while updating trial' },
    });
  }
};

//delete existing trial based on trial id (not currently hooked to front end)
trialController.deleteTrial = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const deletedTrial = await Trials.findByIdAndDelete(_id);
    res.locals.deletedTrial = deletedTrial;
    return next();
  } catch (err) {
    return next({
      log: "Error in 'deleteTrial' middleware",
      status: 500,
      message: { err: 'An error occurred while deleting trial' },
    });
  }
};

export default trialController;
