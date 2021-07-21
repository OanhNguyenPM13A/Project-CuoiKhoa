const mongoose = require('mongoose');

const SchemaCategory = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true,
        unique: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: Date
});

module.exports = mongoose.model('categories', SchemaCategory);