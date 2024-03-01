const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    createdBy:{type:String},
    updatedBy:{type:String}
});

module.exports = mongoose.model('teachers',teacherSchema);