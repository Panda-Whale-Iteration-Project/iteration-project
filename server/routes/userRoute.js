const express = require('express');
const router = express.Router();

import userController from '../controllers/UserController.js'

router.get('/', userController.getUser, (req,res)=>{
    res.status(200).json('response')
})

router.post('/', userController.createUser, (req,res)=>{
    res.status(200).json('response')
})

module.exports = router;