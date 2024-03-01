const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    class:{type:String,required:true},
    parents_name:{type:String,required:true},
    parents_email:{type:String,unique:true,required:true},
    parents_password:{type:String,required:true},
    role:{type:String,required:true},
    createdBy:{type:String},
    notes:[
        {note:String,noteFrom:String,review:[],reviewFrom:String}
    ],
    updatedBy:{type:String}

});

module.exports = mongoose.model('students',studentSchema);