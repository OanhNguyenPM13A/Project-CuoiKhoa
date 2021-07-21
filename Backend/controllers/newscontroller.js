const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const news = require('../models/newsmodel');
const role= require("../middleware/authJwt");
// create new news
function createnews (req, res) {
  const newsmodel = new news({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    summary: req.body.summary,
    thumbnail: req.body.thumbnail,
    content: req.body.content,
    status:1,
    category: req.body.category,
    user: req.body.user
  });
  return newsmodel
    .save()
    .then((newnews) => {
      return res.status(201).json({
        success: true,
        message: 'New news created successfully',
        news: newnews,
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

// Get all news
 function getAllnews( req, res){
  news.find()
  .then((allnews) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all news',
        news: allnews,
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

// get single news
function getSinglenews(req, res) {
  const id = req.params.newsId;
  news.findById(id)
    .then((singlenews) => {
      res.status(200).json({
        success: true,
        message: `More on ${singlenews.name}`,
        news: singlenews,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This news does not exist',
        error: err.message,
      });
   });
}

//update a news
function updatenews(req, res) {
  const id = req.params.newsId;
  const updateObject = req.body;
  news.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'news is updated',
        updatenews: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a news
 function deletenews(req, res) {
  const id = req.params.newsId;
  news.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}

router.post('/news',[role.verifyToken], createnews);

router.get('/news', getAllnews);

router.get('/news/:newsId',getSinglenews);

router.patch('/news/:newsId',[role.verifyToken], updatenews);

router.delete('/news/:newsId',[role.verifyToken], deletenews);

module.exports = router;