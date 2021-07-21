const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/usermodel');
const role= require("../middleware/authJwt");
// create new user
function createUser (req, res) {
  const usermodel = new user({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone
  });
  return usermodel
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: 'New user created successfully',
        User: newUser,
      });
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });

   
}

// Get all User
 function getAllUser( req, res){
  user.find()
  .select('_id name username password email phone address')
  .then((allUser) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all User',
        User: allUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

// get single User
function getSingleUser(req, res) {
  const id = req.params.userId;
  user.findById(id)
    .then((singleUser) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleUser.name}`,
        User: singleUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This User does not exist',
        error: err.message,
      });
   });
}

//update a User
function updateUser(req, res) {
  const id = req.params.userId;
  const updateObject = req.body;
  user.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'User is updated',
        updateUser: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a User
 function deleteUser(req, res) {
  const id = req.params.userId;
  user.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}



router.post('/user', createUser);

router.get('/user',[role.verifyToken, role.isAdmin], getAllUser);

router.get('/user/:userId', getSingleUser);

router.patch('/user/:userId', updateUser);

router.delete('/user/:userId',[role.verifyToken, role.isAdmin], deleteUser);

module.exports = router;