const express = require('express');
const router = express.Router();

import subscriptionController from '../controllers/SubscriptionController.js'

router.post('/', subscriptionController.createSubscription, (req,res)=>{
    res.status(200).json('response')
})

router.put('/', subscriptionController.updateSubscription, (req,res)=>{
    res.status(200).json('response')
})

router.delete('/', subscriptionController.deleteSubscription, (req,res)=>{
    res.status(200).json('response')
})


module.exports = router;