const express = require("express");
const developers = require("../connections/model/developer");
const students = require("../connections/model/students");
const teachers = require("../connections/model/teachers");
const loginusers = require("../connections/model/loginUsers");
const principles = require("../connections/model/principle");
const announcements = require("../connections/model/announcements");
require("../connections/connection");

const presentUserDb = async (token) => {
  return await developers.findOne({ token });
};

const teacherPresentUserDb = async (token) => {
  return await teachers.findOne({ token });
};

const saveUserDb = async (data) => await data.save();

const updateAdminDb = async (_id, dummyData) =>
  await teachers.updateOne({ _id }, dummyData);

const deleteAdminDb = async (_id) => {
  return await teachers.findByIdAndDelete({ _id });
};

const studentPresentUserDb = async (token) => {
  return await students.findOne({ token });
};


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

const principleLoginDb = async (email) => {
  return await principles.findOne({ email });
};

const updatePrincipleDb = async (_id, dummyData) => {
  return await principles.findOneAndUpdate({ _id }, dummyData);
};

const deletePrincipleDb = async (_id) => {
  return await principles.findOneAndDelete({ _id });
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

module.exports = {
  presentUserDb,
  saveUserDb,
  updateAdminDb,
  deleteAdminDb,
  teacherPresentUserDb,
  studentPresentUserDb,
  updateUserDb,
  deleteUserDb,
  addNoteDb,
  removeNoteDb,
  AnnouncementDb,
  parentsDb,
  principleLoginDb,
  updatePrincipleDb,
  deletePrincipleDb,
  getAllStudentsDb,
  getNotesDb,
  resetPasswordDb,
  getStudentByClassDb,
  getannouncementDb,
};
