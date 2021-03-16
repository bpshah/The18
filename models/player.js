var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var player = new Schema({
    sr: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    "first name name": {
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

mongoose.model('player', player);