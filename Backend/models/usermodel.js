const mongoose = require('mongoose');

const SchemaUser = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: {
      type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    address: String,
    role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role"
        },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: Date
});

module.exports = mongoose.model('users', SchemaUser);