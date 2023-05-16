const mongoose = require("mongoose");
const objectAssign = require("object-assign");
const teacherSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    caption:{
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageURL:{
        type: String,
        required: true,
    }
    })

    module.exports = mongoose.model('teachers', teacherSchema );