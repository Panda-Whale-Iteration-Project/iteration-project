const Trials = require('../models/TrialsModel');

const trialController = {};

// trialController middlewares
trialController.createTrial = async (req, res, next) => {
  const { trialName, expDate, notifyDate, subCost, category, detail } = req.body;

  try {
    const newTrial = Trials.create({ trialName, expDate, notifyDate, subCost, category, detail });
    res.locals.newTrial = newTrial;
    return next()
  }

  catch(err) {
    return next ({
      log: 'Error in \'createTrial\' middleware: ' + err,
      status: 500,
      message: { err; 'An error occurred while creating new trials'}
    });
  };
};

trialController.updateTrial = async (req, res, next) => {
  const { _id } = req.params;
  const { trialName, expDate, notifyDate, subCost, category, detail } = req.body;

  try {
    return next();
  }

  catch(err) {
    return next ({
      
    })
  }
};

trialController.deleteTrial = async (req, res, next) => {

};

module.exports = trialController;