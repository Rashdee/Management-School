const express = require("express");
const students = require("../connections/model/students");
const announcements = require("../connections/model/announcements")
require("../connections/connection");


const getNotesDb = async (email) => await students.findOne({ email });

const updateUserDb = async (_id, dummyData) => {
  return await students.findByIdAndUpdate({ _id }, dummyData);
};

const deleteUserDb = async (_id) => {
  return await students.findByIdAndDelete({ _id });
};

const addNoteDb = async (email, notes) => {
  return await students.updateOne({ email }, { notes });
};

const removeNoteDb = async (email) => {
  await students.updateOne({ email }, { $unset: { notes: 1 } });
};

const getStudentByClassDb = async (class_no) => {
  return await students.find({ class: class_no });
};

const AnnouncementDb = async (_id) => {
  return await announcements.findByIdAndDelete({ _id });
};

const parentsDb = async (email) => {
  return await students.findOne({ parents_email: email });
};

const getAllStudentsDb = async () => {
  return await students.find();
};

const resetPasswordDb = async (parents_email, parents_password) => {
  return await students.findOneAndUpdate(
    { parents_email },
    { parents_password }
  );
};

const getannouncementDb = async (target) => {
  return await announcements.find({
    $or: [{ target }, { target: "globally" }],
  });
};

const saveUserDb = async (data) => await data.save();

module.exports = {
  saveUserDb,
  updateUserDb,
  deleteUserDb,
  addNoteDb,
  removeNoteDb,
  AnnouncementDb,
  parentsDb,
  getAllStudentsDb,
  getNotesDb,
  resetPasswordDb,
  getStudentByClassDb,
  getannouncementDb,
};
