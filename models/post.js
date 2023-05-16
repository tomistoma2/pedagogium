const mongoose = require("mongoose");
const objectAssign = require("object-assign");
const postSchema = new mongoose.Schema({
   
    caption: {
        type: String,
        required: true,
    },
    contentShort:{
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    section: {
        type: String,
        required: true,
        lowercase: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageURL:{
        type: String,
    },
    url:{
        type: String, 
    }
    })

    module.exports = mongoose.model('posts', postSchema );