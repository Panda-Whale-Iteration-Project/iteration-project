import express from 'express';
const userRouter = express.Router();

import userController from '../controllers/UserController.js';

// router.get('/:_id or /:email, userController.getUser, (req, res) => {
//   Do something...
// });

userRouter.get('/', userController.getUser, (_req, res) => {
  res.status(200).json({
    user: res.locals.foundUser,
    subscriptions: res.locals.subscriptions,
    trials: res.locals.trials,
  });
});

export default userRouter;
