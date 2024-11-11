import express from 'express';
const trialRouter = express.Router();

import trialController from '../controllers/TrialController.js';

trialRouter.post('/', trialController.createTrial, (_req, res) => {
  res.status(200).json(res.locals.newTrial);
});

trialRouter.put('/:_id', trialController.updateTrial, (_req, res) => {
  res.status(200).json(res.locals.updatedTrial);
});

trialRouter.delete('/:_id', trialController.deleteTrial, (_req, res) => {
  res.status(200).json(res.locals.deletedTrial);
});

export default trialRouter;
