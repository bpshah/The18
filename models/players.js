var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var players = new Schema({
    sr: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    "full name": {
        type: String,
        required: true
    },
    "last name": {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    "birth date": {
        type: String,
        required: true
    },
    "birth place": {
        type: String,
        required: true
    },
    "birth country": {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    "team id": {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    }
});

mongoose.model('players', players);