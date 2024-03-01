const students = require('../connections/model/students')

const resetPasswordDb = async (parents_email, parents_password) => {
  return await students.findOneAndUpdate(
    { parents_email },
    { parents_password }
  );
};

const parentsDb = async (email) => {
  return await students.findOne({ parents_email: email });
};


const getNotesDb = async (email) => await students.findOne({ email });

const addNoteDb = async (email, notes) => {
  return await students.updateOne({ email }, { notes });
};

module.exports = {resetPasswordDb,parentsDb,getNotesDb, addNoteDb}