const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");

// call database
require('./config/database');

// call controlcontroller
const controlcontroller = require('./controllers/controlcontroller');
app.use('/', controlcontroller);

// require('./models/categorymodel');

// require('./models/usermodel');

// require('./models/newsmodel');

// require('./models/commentmodel');


// call role
// const Role= require('./models/rolemodel');
//create role
// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         console.log("added 'user' to roles collection");
//       });
//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
//  initial();


 require('./routes/authroutes')(app);

// require('./routes.js/useroutes');
app.listen(3000, ()=>{ console.log('Server Opened'); });