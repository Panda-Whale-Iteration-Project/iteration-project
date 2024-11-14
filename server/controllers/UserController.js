import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import Subscription from '../models/SubscriptionsModel.js';
import Trial from '../models/TrialsModel.js';
// import Budget from '../models/BudgetModel.js';

const userController = {};

// userController middlewares

//get a user and all their subscriptions/trials based on user ID
userController.getUser = async (req, res, next) => {
  //grab userID from auth redirect
  const userID = req.params._id;

  try {
    await User.findById({ _id: userID }).then((result) => {
      //if no matching user was found
      console.log('🤍found user: ', result);
      if (result === null) {
        return next({
          log: 'findOne query returned null in getUser - email not found in DB',
          status: 404,
          message: {
            err: `No user found in database with email ${userID}`,
          },
        });
      }
      res.locals.foundUser = result;
    });
  } catch (error) {
    return next({
      log: error,
      status: 500,
      message: { err: 'User was unable to be retrieved from the database.' },
    });
  }

  //get all of users' subscriptions
  try {
    await Subscription.find({ userId: userID }).then((result) => {
      console.log('🎉found subscriptions: ', result);
      res.locals.subscriptions = result;
    });
  } catch (error) {
    return next({
      log: error,
      status: 500,
      message: {
        err: "User's subscriptions were unable to be retrieved from the database.",
      },
    });
  }

  //get all of users' trials
  try {
    const trials = await Trial.find({ userId: userID });
    res.locals.trials = trials;
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 500,
      message: {
        err: "User's trials were unable to be retrieved from the database.",
      },
    });
  }
};

//update user budget
userController.updateBudget = async (req, res, next) => {
  const { _id } = req.params;
  const { budget } = req.body;

  try {
    const updatedBudget = await User.findByIdAndUpdate(
      _id,
      {
        budget,
      },
      { new: true }
    );
    //will return the updated subscription details
    res.locals.updatedBudget = updatedBudget;
    return next();
  } catch (err) {
    return next({
      log: "Error in 'updateBudget' middleware: " + err,
      status: 500,
      message: { err: 'An error occurred while updating subscription' },
    });
  }
};

export default userController;
