var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var clubs = new Schema({
    sr: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
});

mongoose.model('clubs', clubs);