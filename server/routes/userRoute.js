import express from 'express';
const userRouter = express.Router();

import userController from '../controllers/UserController.js';

userRouter.get('/:_id', userController.getUser, (_req, res) => {
  res.status(200).json({
    user: res.locals.foundUser,
    subscriptions: res.locals.subscriptions,
    trials: res.locals.trials,
    budget: res.locals.budget,
  });
});

//route to handle budget update

userRouter.put('/:_id', userController.updateBudget, (_req, res) => {
  res.status(200).json(res.locals.updatedBudget);
});
export default userRouter;
