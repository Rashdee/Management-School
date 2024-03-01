const express = require("express");
const teachers = require("../connections/model/teachers");
require("../connections/connection");

const saveUserDb = async (data) => await data.save();

const updateAdminDb = async (_id, dummyData) =>
  await teachers.updateOne({ _id }, dummyData);

const deleteAdminDb = async (_id) => {
  return await teachers.findByIdAndDelete({ _id });
};

const getAllTeachersDb = async () => {
  return await teachers.find();
};

module.exports = {saveUserDb, updateAdminDb, deleteAdminDb,getAllTeachersDb }


