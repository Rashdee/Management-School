const express = require('express');
const routerStudent = express.Router();
const {
    createUser,
    updateUser,
    deleteUser,
    addNote,
    removeNote,
    addAnnouncement,
    removeAnnouncement,
    getAll,
  } = require('./controller');

  
const {studentCreateCheck, updateCheck, deleteCheck} = require('../middlewares/middleware')

routerStudent.post("/create", studentCreateCheck, createUser);

routerStudent.put("/update",updateCheck, updateUser);

routerStudent.delete("/delete", deleteCheck, deleteUser);

// routerStudent.get("/getNote",getNotes);

routerStudent.put("/addNote",addNote);

routerStudent.put("/removeNote",removeNote);

routerStudent.put("/addAnnouncement",addAnnouncement);

routerStudent.put("/removeAnnouncement",removeAnnouncement);

// routerStudent.put("/addReview",addReviews)

// routerStudent.get("/getAnnouncement",getAnnouncements)

routerStudent.get("/getAll", getAll);

module.exports = routerStudent;
