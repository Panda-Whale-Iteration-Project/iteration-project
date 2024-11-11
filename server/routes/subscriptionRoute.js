import express from 'express';
const subscriptionRouter = express.Router();

import subscriptionController from '../controllers/SubscriptionController.js';

subscriptionRouter.post(
  '/',
  subscriptionController.createSubscription,
  (_req, res) => {
    res.status(200).json(res.locals.newSub);
  }
);

subscriptionRouter.put(
  '/:_id',
  subscriptionController.updateSubscription,
  (_req, res) => {
    res.status(200).json(res.locals.updatedSub);
  }
);

subscriptionRouter.delete(
  '/:_id',
  subscriptionController.deleteSubscription,
  (_req, res) => {
    res.status(200).json(res.locals.deletedSub);
  }
);

export default subscriptionRouter;
