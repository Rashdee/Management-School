const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    target:{type:String,required:true},
    announcement:{type:String,required:true},
    from:{type:String}
});

module.exports = mongoose.model("announcements",announcementSchema);