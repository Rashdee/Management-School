const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
    userId : String,
    email : String,
    token : String
},{timestamps:true})

module.exports = mongoose.model('loginusers',loginUserSchema);