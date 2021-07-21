const express = require('express');
const router = express.Router();


// Gọi categorycontroller
const categorycontroller = require('./categorycontroller');
router.use('/', categorycontroller);

// Gọi usercontroller
const usercontroller = require('./usercontroller');
router.use('/', usercontroller);

// Gọi newscontroller
const newscontroller = require('./newscontroller');
router.use('/', newscontroller);

// Gọi newscontroller
const commentcontroller = require('./commentcontroller');
router.use('/', commentcontroller);

module.exports = router;