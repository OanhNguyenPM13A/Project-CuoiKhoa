const mongoose = require('mongoose');

const SchemaNews = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true
  },
  summary: {
    type: String,
    require: true
  },
  thumbnail: String,
  content: {
    type: String,
    require: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status:Number,
  date_created: {
    type: Date,
    default: Date.now()
  },
  date_updated: Date
});

module.exports = mongoose.model('news', SchemaNews);