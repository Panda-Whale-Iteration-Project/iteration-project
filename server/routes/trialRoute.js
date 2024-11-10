const express = require('express');
const router = express.Router();

import trialController from '../controllers/TrialController.js'

router.post('/', trialController.createTrial, (req, res) => {
  res.status(200).json(res.locals.newTrial);
});

router.put('/:_id', trialController.updateTrial, (req, res) => {
  res.status(200).json(res.locals.updatedTrial);
});

router.delete('/:_id', trialController.deleteTrial, (req,res)=> {
    res.status(200).json(res.locals.deletedTrial);
})

module.exports = router;