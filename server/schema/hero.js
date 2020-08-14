const mongoose = require('mongoose');

//schema definition
const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: true
    }
})

//schema creation
const Hero = new mongoose.model('Hero', heroSchema);

exports.Hero = Hero;