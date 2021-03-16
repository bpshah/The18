var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var managers = new Schema({
    sr: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    "first name": {
        type: String,
        required: true
    },
    "First name": {
        type: String,
        required: true
    },
    "last name": {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
});

mongoose.model('managers', managers);