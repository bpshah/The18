var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var coaches = new Schema({
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
    "full name": {
        type: String,
        required: true
    },
    "first name": {
        type: String,
        required: true
    },
    "last name": {
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
    height:{
        type: String,
        required: true
    },
    weight:{
        type: String,
        required: true
    },
    "current team":{
        type: String,
        required: true
    },
    "current team id":{
        type: Number,
        required: true
    },
    "number of teams coached":{
        type: Number,
        required: true
    },
    "other teams coached":{
        type: Array,
        required: true
    },
});

mongoose.model('coaches', coaches);