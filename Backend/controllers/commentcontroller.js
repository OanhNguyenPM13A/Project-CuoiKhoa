const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// gọi comment_models
const comment = require('../models/commentmodel');
const role= require("../middleware/authJwt");
// create new comment
function createComment (req, res) {
  const commentmodel = new comment({
    _id: mongoose.Types.ObjectId(),
  });
  return commentmodel
    .save()
    .then((newComment) => {
      return res.status(201).json({
        success: true,
        message: 'New comment created successfully',
        comment: newComment,
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

// Get all comment
 function getAllcomment( req, res){
  comment.find()
    .then((allcomment) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all comment',
        comment: allcomment,
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

// get single comment
function getSinglecomment(req, res) {
  const id = req.params.commentId;
  comment.findById(id)
    .then((singlecomment) => {
      res.status(200).json({
        success: true,
        message: `More on ${singlecomment.name}`,
        comment: singlecomment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This comment does not exist',
        error: err.message,
      });
   });
}

//update a comment
function updatecomment(req, res) {
  const id = req.params.commentId;
  const updateObject = req.body;
  comment.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'comment is updated',
        updatecomment: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a comment
 function deletecomment(req, res) {
  const id = req.params.commentId;
  comment.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}

router.post('/comment',[role.verifyToken], createComment);

router.get('/comment',[role.verifyToken], getAllcomment);

router.get('/comment/:commentId',[role.verifyToken],getSinglecomment);

router.patch('/comment/:commentId',[role.verifyToken], updatecomment);

router.delete('/comment/:commentId',[role.verifyToken], deletecomment);

module.exports = router;