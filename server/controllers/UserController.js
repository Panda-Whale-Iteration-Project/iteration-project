const User = require('../models/UserModel');

const userController = {};

// subscriptionController middlewares
userController.getUser = async (req, res, next) => {
  //how do we grab user info from front-end?
  const userEmail = 'idkkk';
  
  try {
    await UserInfo.findOne({email: userEmail})
    .then((result) => {
    
      //if no matching user was found
      if (result === null){
        return next({
          log: 'findOne query returned null in getUser - email not found in DB',
          status: 404,
          message: {
            err: `No user found in database with email ${userEmail}`
          }
        })
      }
      res.locals.foundUser = result;
      return next();
      })
    } catch (error) {
      return next({
        log: error,
        status: 500,
        message: {err: 'User was unable to be retrieved from the database.'}
      })
    }
};

userController.createUser = async (req, res, next) => {
  //check that data values provided are of the correct types
  if (
    typeof req.body.firstName !== 'string' ||
    typeof req.body.lastName !== 'string' ||
    typeof req.body.email !== 'string'
  ) { //if data types don't match expected, send client an error
    return next({
      log: 'Data type of name, email, or phonenumber does not match UserInfoModel during createUser middleware',
      status: 400,
      message: { err: 'Invalid user data provided.' },
    });
  }

  //grab values needed from request body
  const {firstName, lastName, email, budget} = req.body;

  //DB query to create user
  try {
  await UserInfo.create({firstName, lastName, email, phoneNumber, budget, subscriptionsID: [], trialsID:[] })
  .then((result) => {
    res.locals.createdUser = result;
  })
  return next();
  } catch (error) {
    return next({
      log: error,
      status: 500,
      message: {err: 'User was unable to be added to database.'}
    })
  }




};

module.exports = userController;
