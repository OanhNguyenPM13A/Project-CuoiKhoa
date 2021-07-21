const ROLES = require("../models/rolemodel");
const User = require("../models/usermodel");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    for (let i = 0; i < req.body.role.length; i++) {
     //find all role
      ROLES.find({},(error,roles)=>{
       
        //roles = list role in db
        //if(!["user",'admin'].includes("admin"))

        if(!roles.map(role => role.name).includes(req.body.role[i])){
          res.status(400).send({
            message: `Failed! Role ${req.body.role[i]} does not exist!`
          });
        }
         return;
      });
     
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;