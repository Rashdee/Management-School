const {encrypt} = require('../allTokens/token')
const students = require("../connections/model/students");
const announcements = require("../connections/model/announcements")

const  {
  saveUserDb,
  updateUserDb,
  deleteUserDb,
  addNoteDb,
  AnnouncementDb,
  getAllStudentsDb,
  getNotesDb,
} = require("./query");
  


  const createUser = async (req, resp) => {
    try {
      const {
        name,
        email,
        password,
        class_no,
        parents_name,
        parents_email,
        parents_password,
      } = req.body;
      const new_password = encrypt(password);
      const new_parents_password = encrypt(parents_password);
      const data = new students({
        name,
        email,
        password: new_password,
        class:class_no,
        parents_name,
        parents_email,
        parents_password: new_parents_password,
        role:"user",
        createdBy: req.body.presentEmail,
      });
      const result = await saveUserDb(data);
      resp.send({
        status: 200,
        message: "User created Successfully",
        data: result,
      });
    } catch (error) {
      resp.send({ status: 400, message: error });
    }
  };
  
  const updateUser = async (req, resp) => {
    console.log("entered in update user 1");
    try {
      const dummyData = {};
  
      if (req.body.name) {
        dummyData.name = req.body.name;
      }
      if (req.body.email) {
        dummyData.email = req.body.email;
      }
      if (req.body.password) {
        const new_password = encrypt(req.body.password);
        dummyData.password = new_password;
      }
      if (req.body.class_no) {
        dummyData.class = req.body.class_no;
      }
      if (req.body.parents_name) {
        dummyData.parents_name = req.body.parents_name;
      }
      if (req.body.parents_email) {
        dummyData.parents_email = req.body.parents_email;
      }
      if (req.body.parents_password) {
        const new_password = encrypt(req.body.parents_password);
        dummyData.parents_password = new_password;
      }
  
      dummyData.updatedBy = req.body.presentEmail;
      const result = await updateUserDb(req.body._id, dummyData);
      if (!result) {
        return resp.send({
          success: false,
          status: 400,
          message: "data not found",
        });
      }
      resp.send({ status: 200, message: "Successfully Updated", data: dummyData });
    } catch (error) {
      resp.send({ status: 400, message: error });
    }
  };
  
  const deleteUser = async (req, resp) => {
    try {
      const { _id } = req.query;
  
      const result = await deleteUserDb(_id);
      if (!result) {
        return resp.send({
          success: false,
          status: 400,
          message: "Data not found",
        });
      }
      resp.send({ status: 200, message: "Successfully Deleted", data: {name:result.name,email:result.email} });
    } catch (error) {
      resp.send(error);
    }
  };


  const addNote = async (req, resp) => {
    console.log("entered in update user 1");
    try {
      const { email, notes } = req.body;
      const data = await getNotesDb(email);
      if (!data) {
        return resp.send({
          status: 400,
          message: "This email id is not present in our database",
        });
      }
  
      console.log("notes lemgth", notes.length);
  
      for (let i = 0; i < notes.length; i++) {
        encryptedNote = encrypt(notes[i]);
        const new_note = { note: encryptedNote, noteFrom: req.body.presentName };
        data.notes.push(new_note);
      }
  
  
      const result = await addNoteDb(email, data.notes);
  
      resp.send({ status: 200, message: "Notes added", data:req.body });
    } catch (error) {
      resp.send({ status: 400, message: "error occured" });
    }
  };
  
  const removeNote = async (req, resp) => {
    console.log("entered in remove note 1");
    try {
      const { email, id } = req.query;
      const data = await getNotesDb(email);
      if (!data) {
        return resp.send({
          status: 400,
          message: "This email id is not present in our database",
        });
      }
  
  
      let new_notes = [];
  
      for (let i = 0; i < data.notes.length; i++) {
        if (data.notes[i]._id == id) {
          continue;
        }
        new_notes.push(data.notes[i]);
      }
  
  
      const result = await addNoteDb(email, new_notes);
  
      resp.send({
        status: 200,
        message: "Notes removed Successfully",
        data: result,
      });
    } catch (error) {
      resp.send({ status: 400, message: "error occured" });
    }
  };
  
  const addAnnouncement =async (req, resp) => {
    console.log("entered in update user 1");
    // try {
      const { target, announcement } = req.body;
    
  
      for (let i = 0; i < announcement.length; i++) {
        encryptedAnnouncement = encrypt(announcement[i]);
        const new_announcement =new announcements( {target, announcement : encryptedAnnouncement, from: req.body.presentName });
        console.log("new announcement",new_announcement)
        const result = await saveUserDb(new_announcement);
        console.log("reslut",result);
      }
    
      resp.send({ status: 200, message: "announcement added", data: req.body });
    // } catch (error) {
    //   resp.send({ status: 400, message: "error occured" });
    // }
  };
  
  const removeAnnouncement = async (req, resp) => {
    console.log("entered in remove note 1");
    
      const {id } = req.query;
      const result = await AnnouncementDb(id);
      if(!result){resp.send({success:false,status:400,message:"data not found"})}
  
      resp.send({
        status: 200,
        message: "Announcement removed Successfully",
        data: result,
      });
    
  };
  
  
  
  const getAll = async (req, resp) => {
    try {
      const data = await getAllStudentsDb();
      if (!data) {
        return resp.send({
          success: false,
          status: 400,
          message: "Data not found",
          data: {},
        });
      }
      resp.send({
        success: true,
        status: 200,
        message: "get Data successfull",
        data,
      });
    } catch (err) {
      resp.send({
        success: false,
        status: 400,
        message: "some error occured",
        data: {},
        key: err,
      });
    }
  };
    

  module.exports = {
    createUser,
    updateUser,
    deleteUser,
    addNote,
    removeNote,
    addAnnouncement,
    removeAnnouncement,
    getAll,
  };
  