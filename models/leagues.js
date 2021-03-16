var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var leagues = new Schema({
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
    "competition type": {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    "country code": {
        type: String,
        required: true
    },
    season : {
      type: Number,
      required: true 
    },
    "season start date": {
        type: String,
        required: true
    },
    "season end date": {
        type: String,
        required: true
    },
    logo:{
        type: String,
        required: true
    },
    flag:{
        type: String,
        required: true
    },
});

mongoose.model('leagues', leagues);