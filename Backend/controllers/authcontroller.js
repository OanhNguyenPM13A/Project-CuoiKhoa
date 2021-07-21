const config = require("../config/authconfig");
const Role = require("../models/rolemodel");
const User = require("../models/usermodel");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const mongoose = require('mongoose');

exports.signup = (req, res) => {
  // console.log(req.body);

  
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  try {
    user.save((err, user) => {
      //  console.log(err);
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (req.body.role) {
        Role.find(
          {
            name: { $in: req.body.role }
          },
          (err, roles) => {
            console.log(roles);
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.role = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.role = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
 
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      
     
      Role.findOne({  _id: user.role }, (err, role) => {
       
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          role: ["ROLE_" + role.name.toUpperCase()],
          accessToken: token
        });
        
      });

      
      
    });
};