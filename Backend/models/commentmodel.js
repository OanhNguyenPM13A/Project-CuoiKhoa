const mongoose= require('mongoose');

const SchemaComment= new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    description: String,
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'news'
    }
});

module.exports = mongoose.model('comments',SchemaComment);