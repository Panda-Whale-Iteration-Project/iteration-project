const UserInfo = require('../models/UserInfoModel');

const userController = {};

// subscriptionController middlewares
userController.getUser = async (req, res, next) => {
  //do stuff

  return next();
};

userController.createUser = async (req, res, next) => {
  //do stuff

  return next();
};

module.exports = userController;
