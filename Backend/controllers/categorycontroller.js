const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// gọi category_models
const category = require('../models/categorymodel');
const role= require("../middleware/authJwt");
// create new category
function createCategory (req, res) {
  const categorymodel = new category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  return categorymodel
    .save()
    .then((newCategory) => {
      return res.status(201).json({
        success: true,
        message: 'New category created successfully',
        category: newCategory,
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

// Get all category
 function getAllCategory( req, res){
  category.find()
    .then((allCategory) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all category',
        category: allCategory,
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

// get single category
function getSingleCategory(req, res) {
  const id = req.params.categoryId;
  category.findById(id)
    .then((singleCategory) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleCategory.name}`,
        category: singleCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This category does not exist',
        error: err.message,
      });
   });
}

//update a category
function updateCategory(req, res) {
  const id = req.params.categoryId;
  const updateObject = req.body;
  category.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Category is updated',
        updateCategory: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a category
 function deleteCategory(req, res) {
  const id = req.params.categoryId;
  category.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}

router.post('/category',[role.verifyToken, role.isAdmin], createCategory);

router.get('/category', getAllCategory);

router.get('/category/:categoryId', getSingleCategory);

router.patch('/category/:categoryId',[role.verifyToken, role.isAdmin], updateCategory);

router.delete('/category/:categoryId',[role.verifyToken, role.isAdmin],deleteCategory);

module.exports = router;