const express = require('express');
const router = express.Router();

import subscriptionController from '../controllers/SubscriptionController.js'

router.post('/', subscriptionController.createSubscription, (req, res)=>{
    res.status(200).json(res.locals.newSub);
})

router.put('/:_id', subscriptionController.updateSubscription, (req, res)=>{
    res.status(200).json(res.locals.updatedSub);
})

router.delete('/:_id', subscriptionController.deleteSubscription, (req, res)=>{
    res.status(200).json(res.locals.deletedSub);
})


module.exports = router;