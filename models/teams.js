var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var teams = new Schema({
    sr: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    founded: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    "venue surface": {
        type: String,
        required: true
    },
    "venue address": {
        type: String,
        required: true
    },
    "venue city": {
        type: String,
        required: true
    },
    "venue capacity": {
        type: String,
        required: true
    }
});

mongoose.model('teams', teams, "teams");