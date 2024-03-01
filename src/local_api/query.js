const students = require('../connections/model/students');
const announcements = require('../connections/model/announcements');
require("../connections/connection");

const getNotesDb = async (email) => await students.findOne({ email });

const getannouncementDb = async (target) => {
  return await announcements.find({
    $or: [{ target }, { target: "globally" }],
  });
};

module.exports = {getNotesDb, getannouncementDb}