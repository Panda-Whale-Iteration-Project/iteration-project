const express = require('express');
const router = express.Router();

import userController from '../controllers/UserController.js'

// router.get('/:_id or /:email, userController.getUser, (req, res) => {
//   Do something...
// });

router.get('/', userController.getUser, (req, res)=>{
    res.status(200).json(res.locals.foundUser)
})

router.post('/', userController.createUser, (req, res)=>{
    res.status(200).json(res.locals.createdUser)
})

module.exports = router;