// const express = require("express");
// const app = express();
// app.use(express.json());
// const crypto = require("crypto");
// const loginUsers = require("../connections/model/loginUsers");
// const { verify } = require("jsonwebtoken");
// require("dotenv").config();

// const code = "itsSecreateKey";

// const {
//   supperLoginDb,
//   adminLoginDb,
//   presentUserDb,
//   saveUserDb,
//   updateAdminDb,
//   deleteAdminDb,
//   userLoginDb,
//   teacherPresentUserDb,
//   studentPresentUserDb,
//   updateUserDb,
//   deleteUserDb,
//   addNoteDb,
//   removeNoteDb,
//   loginUsersUpdateDb,
//   updateParentsDb,
//   deleteParentsDb,
//   parentsDb,
//   principleLoginDb,
//   updatePrincipleDb,
//   deletePrincipleDb,
//   getAllTeachersDb,
//   getAllStudentsDb,
//   getNotesDb,
//   resetPasswordDb,
//   AnnouncementDb,
//   getStudentByClassDb,
//   getannouncementDb
// } = require("../queries/query");
// const Joi = require("joi");
// const developers = require("../connections/model/developer");
// const teachers = require("../connections/model/teachers");
// const students = require("../connections/model/students");
// const loginusers = require("../connections/model/loginUsers");
// const principles = require("../connections/model/principle");
// const announcemensts = require("../connections/model/announcements");
// require("../connections/connection");
// const { loginSchema } = require("../joi_validation/loginSchema");
// const { encrypt, decrypt } = require("../tokens/token");
// const sendResponse = require("../response/response");
// const jwtToken = require("../tokens/jwtToken");

// const key = "secreatekeyrashdebdjfjd456789431";
// const iv = "easdfhdkdlk23421";
// let presentToken = null;
// let presentRole = "";
// let presentEmail = "";
// let presentName;
// let presentStudentEmail;


// const createSupperAdmin = async (req, resp) => {
//   try {
//     const isDataPresent = await developers.findOne({ role: "supper Admin" });
//     if (isDataPresent) {
//       return resp.send("supper Admin already present can't be added more");
//     }
//     const { name, email, password, role } = req.query;
//     const new_password = encrypt(password);
//     const data = new developers({
//       name,
//       email,
//       password: new_password,
//       role,
//     });
//     const result = await data.save();
//     return resp.send(result);
//   } catch (error) {
//     resp.status(400).send(error);
//   }
// };

// const createAdmin = async (req, resp) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const new_password = encrypt(password);
//     const data = new teachers({
//       name,
//       email,
//       password: new_password,
//       role,
//       createdBy: req.body.presentEmail,
//     });
//     const result = await saveUserDb(data);
//     resp.send({
//       status: 200,
//       message: "Admin created succesfully",
//       data: result,
//     });
//   } catch (error) {
//     resp.send({
//       status: 400,
//       meassage: "Please change email id and try again",
//       data: [],
//     });
//   }
// };

// const updateAdmin = async (req, resp) => {
//   try {
//     const dummyData = {};

//     if (req.body.name) {
//       dummyData.name = req.body.name;
//     }
//     if (req.body.email) {
//       dummyData.email = req.body.email;
//     }
//     if (req.body.password) {
//       const new_password = encrypt(req.body.password);
//       dummyData.password = new_password;
//     }

//     dummyData.updatedBy = req.body.presentEmail;
//     console.log("reached upto here in update admin");

//     const result = await updateAdminDb(req.body._id, dummyData);
//     resp.send({ status: 200, message: "Updated Successfully", data: dummyData });
//   } catch (error) {
//     resp.send(error);
//   }
// };

// const deleteAdmin = async (req, resp) => {
//   try {
//     console.log("req.body._id", req.query._id);

//     const result = await deleteAdminDb(req.query._id);

//     if (!result) {
//       return resp.send({
//         success: false,
//         status: 400,
//         message: "data is not present",
//       });
//     }
//     resp.send({ status: 400, message: "deleted Successfully", data: {name:result.name,email:result.email} });
//   } catch (error) {
//     resp.send({ status: 400, message: error });
//   }
// };

// const createUser = async (req, resp) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       class_no,
//       parents_name,
//       parents_email,
//       parents_password,
//     } = req.body;
//     const new_password = encrypt(password);
//     const new_parents_password = encrypt(parents_password);
//     const data = new students({
//       name,
//       email,
//       password: new_password,
//       class:class_no,
//       parents_name,
//       parents_email,
//       parents_password: new_parents_password,
//       role,
//       createdBy: req.body.presentEmail,
//     });
//     const result = await saveUserDb(data);
//     resp.send({
//       status: 200,
//       message: "User created Successfully",
//       data: result,
//     });
//   } catch (error) {
//     resp.send({ status: 400, message: error });
//   }
// };

// const updateUser = async (req, resp) => {
//   console.log("entered in update user 1");
//   try {
//     const dummyData = {};

//     if (req.body.name) {
//       dummyData.name = req.body.name;
//     }
//     if (req.body.email) {
//       dummyData.email = req.body.email;
//     }
//     if (req.body.password) {
//       const new_password = encrypt(req.body.password);
//       dummyData.password = new_password;
//     }
//     if (req.body.class_no) {
//       dummyData.class = req.body.class_no;
//     }
//     if (req.body.parents_name) {
//       dummyData.parents_name = req.body.parents_name;
//     }
//     if (req.body.parents_email) {
//       dummyData.parents_email = req.body.parents_email;
//     }
//     if (req.body.parents_password) {
//       const new_password = encrypt(req.body.parents_password);
//       dummyData.parents_password = new_password;
//     }

//     dummyData.updatedBy = req.body.presentEmail;
//     const result = await updateUserDb(req.body._id, dummyData);
//     if (!result) {
//       return resp.send({
//         success: false,
//         status: 400,
//         message: "data not found",
//       });
//     }
//     resp.send({ status: 200, message: "Successfully Updated", data: dummyData });
//   } catch (error) {
//     resp.send({ status: 400, message: error });
//   }
// };

// const deleteUser = async (req, resp) => {
//   try {
//     const { _id } = req.query;

//     const result = await deleteUserDb(_id);
//     if (!result) {
//       return resp.send({
//         success: false,
//         status: 400,
//         message: "Data not found",
//       });
//     }
//     resp.send({ status: 200, message: "Successfully Deleted", data: {name:result.name,email:result.email} });
//   } catch (error) {
//     resp.send(error);
//   }
// };

// const parentsLogin = async (req, resp) => {
//   const result = await loginUsersUpdateDb(req.query.email, req.query.token);
//   if (!result) {
//     const data = new loginusers({
//       email: req.query.email,
//       userId: req.query._id,
//       token: req.query.token,
//     });
//     const result = await saveUserDb(data);
//   }
//   resp.status(200).send({
//     status: 400,
//     message: "login successfull",
//     data: { token: req.query.token },
//   });
// };

// const getNotes = async (req, resp) => {
//   try {
//     const data = await getNotesDb(req.query.email);

//     if (!data) {
//       return resp.send({ status: 400, message: "your data is not present" });
//     }

//     if (data.notes.length == 0) {
//       return resp.send({ status: 400, message: "No note is available" });
//     }


//     for (let j = 0; j < data.notes.length; j++) {
//       const new_review = [];
//       decryptedNote = decrypt(data.notes[j].note);
//       data.notes[j].note = decryptedNote;
//       console.log("data.notes[j].note", data.notes[j].note);
//       console.log("data.notes[j].review.length", data.notes[j].review.length);
//       for (let i = 0; i < data.notes[j].review.length; i++) {
//         decryptedReview = decrypt(data.notes[j].review[i]);
//         new_review.push(decryptedReview);
//       }
//       data.notes[j].review = new_review;
//     }
    
//    return resp.send({
//       status: 200,
//       message: "successfully loaded",
//       data: data.notes,
//     });
//   } catch (err) {
//     resp.send(err);
//   }
// };

// const getAnnouncements = async (req, resp) => {
//   // try {
//     let data = await getannouncementDb(req.query.target);
    
//     let resultdata=[];
//     console.log("data",data);
//     if (!data) {
//       return resp.send({ status: 400, message: "Data not found" });
//     }

//     for (let i = 0; i < data.length; i++) {
//       let decryptedAnnouncement = decrypt(data[i].announcement)
//       resultdata.push({announcement:decryptedAnnouncement,from:data[i].from})
//     }


//     resp.send({
//       success:true,
//       status: 200,
//       message: "successfully loaded",
//       data: resultdata ,
//     });
//   // } catch (err) {
//   //   resp.send({success:false,
//   //     status: 400,
//   //     message:"some error occured"});
//   // }
// };

// const addNote = async (req, resp) => {
//   console.log("entered in update user 1");
//   try {
//     const { email, notes } = req.body;
//     const data = await getNotesDb(email);
//     if (!data) {
//       return resp.send({
//         status: 400,
//         message: "This email id is not present in our database",
//       });
//     }

//     console.log("notes lemgth", notes.length);

//     for (let i = 0; i < notes.length; i++) {
//       encryptedNote = encrypt(notes[i]);
//       const new_note = { note: encryptedNote, noteFrom: req.body.presentName };
//       data.notes.push(new_note);
//     }


//     const result = await addNoteDb(email, data.notes);

//     resp.send({ status: 200, message: "Notes added", data:req.body });
//   } catch (error) {
//     resp.send({ status: 400, message: "error occured" });
//   }
// };

// const removeNote = async (req, resp) => {
//   console.log("entered in remove note 1");
//   try {
//     const { email, id } = req.query;
//     const data = await getNotesDb(email);
//     if (!data) {
//       return resp.send({
//         status: 400,
//         message: "This email id is not present in our database",
//       });
//     }


//     let new_notes = [];

//     for (let i = 0; i < data.notes.length; i++) {
//       if (data.notes[i]._id == id) {
//         continue;
//       }
//       new_notes.push(data.notes[i]);
//     }


//     const result = await addNoteDb(email, new_notes);

//     resp.send({
//       status: 200,
//       message: "Notes removed Successfully",
//       data: result,
//     });
//   } catch (error) {
//     resp.send({ status: 400, message: "error occured" });
//   }
// };

// const addAnnouncement =async (req, resp) => {
//   console.log("entered in update user 1");
//   try {
//     const { target, announcement } = req.body;
  

//     for (let i = 0; i < announcement.length; i++) {
//       encryptedAnnouncement = encrypt(announcement[i]);
//       const new_announcement =new announcemensts( {target, announcement : encryptedAnnouncement, from: req.body.presentName });
//       console.log("new announcement",new_announcement)
//       const result = await saveUserDb(new_announcement);
//       console.log("reslut",result);
//     }
  
//     resp.send({ status: 200, message: "announcement added", data: req.body });
//   } catch (error) {
//     resp.send({ status: 400, message: "error occured" });
//   }
// };

// const removeAnnouncement = async (req, resp) => {
//   console.log("entered in remove note 1");
  
//     const {id } = req.query;
//     const result = await AnnouncementDb(id);
//     if(!result){resp.send({success:false,status:400,message:"data not found"})}

//     resp.send({
//       status: 200,
//       message: "Announcement removed Successfully",
//       data: result,
//     });
  
// };

// const addReviews = async (req, resp) => {
//   try {
//     const { email, review, noteId } = req.body;
//     if (email != req.body.presentStudentEmail) {
//       return resp.send({
//         status: 400,
//         message: "Please enter the correct email of your child",
//       });
//     }
//     const data = await getNotesDb(email);
//     if (!data) {
//       return resp.send({
//         status: 400,
//         message: "This email id is not present in our database",
//       });
//     }


//     for (let j = 0; j < data.notes.length; j++) {
//       if (data.notes[j]._id == noteId) {
//         for (let i = 0; i < review.length; i++) {
//           encryptedReview = encrypt(review[i]);
//           data.notes[j].review.push(encryptedReview);
//         }
//         data.notes[j].reviewFrom = req.body.presentName;
//       }
//     }

//     const result = await addNoteDb(email, data.notes);

//     resp.send({ status: 200, message: "Review added", data: req.body });
//   } catch (error) {
//     resp.send({ status: 400, message: "error occured" });
//   }
// };


// const getAllStudents = async (req, resp) => {
//   try {
//     const data = await getAllStudentsDb();
//     if (!data) {
//       return resp.send({
//         success: false,
//         status: 400,
//         message: "Data not found",
//         data: {},
//       });
//     }
//     resp.send({
//       success: true,
//       status: 200,
//       message: "get Data successfull",
//       data,
//     });
//   } catch (err) {
//     resp.send({
//       success: false,
//       status: 400,
//       message: "some error occured",
//       data: {},
//       key: err,
//     });
//   }
// };

// const resetPassword = async (req,resp) => {
//   try{
//     const password = encrypt(req.query.new_password)
//     const result = await resetPasswordDb(req.body.presentEmail,password);

//     if(!result){return resp.send({success:true,status:400, message:"Data not found"})}
//     resp.send({success:true,status:200,message:"Password reset successfull"})
//   }catch(err){
//     resp.send({success:false,status:400, message:"some error occured",data:err})
// }
// }

// module.exports = {
//   createSupperAdmin,
//   createAdmin,
//   updateAdmin,
//   deleteAdmin,
//   createUser,
//   updateUser,
//   deleteUser,
//   getNotes,
//   addNote,
//   removeNote,
//   addAnnouncement,
//   removeAnnouncement,
//   parentsLogin,
//   addReviews,
//   getAllTeachers,
//   getAllStudents,
//   resetPassword,
//   getAnnouncements
// };
