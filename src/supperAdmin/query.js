const express = require("express");
const developers = require("../connections/model/developer");
const teachers = require("../connections/model/teachers");
const students = require("../connections/model/students");
const principles = require("../connections/model/principle");
const loginusers = require("../connections/model/loginUsers");
require("../connections/connection");

const supperLoginDb = async (email) => {
  return await developers.findOne({ email });
};

const adminLoginDb = async (email) => {
  return await teachers.findOne({ email });
};

const userLoginDb = async (email) => await students.findOne({ email });

const principleLoginDb = async (email) => {
  return await principles.findOne({ email });
};

const parentsDb = async (email) => {
  return await students.findOne({ parents_email: email });
};

const loginUsersUpdateDb = async (email, token) => {
  return await loginusers.findOneAndUpdate({ email }, { token });
};

const saveUserDb = async (data) => await data.save();

module.exports = {
  supperLoginDb,
  adminLoginDb,
  userLoginDb,
  principleLoginDb,
  parentsDb,
  loginUsersUpdateDb,
  saveUserDb
};
