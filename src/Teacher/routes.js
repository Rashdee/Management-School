const express = require('express');
const routerTeacher = express.Router();
const {createAdmin, updateAdmin, deleteAdmin, getAllTeachers} = require('./controller');


const {createCheck, updateCheck, deleteCheck} = require('../middlewares/middleware')

routerTeacher.post("/create", createCheck, createAdmin);

routerTeacher.put("/update",updateCheck, updateAdmin);

routerTeacher.delete("/delete", deleteCheck, deleteAdmin);

routerTeacher.get("/getAll", getAllTeachers);

module.exports = routerTeacher;
