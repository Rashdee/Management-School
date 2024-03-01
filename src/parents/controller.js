
const { encrypt } = require("../allTokens/token");
require('dotenv').config();
const nodemailer = require("nodemailer");
const {
  resetPasswordDb,
  parentsDb,
  getNotesDb,
  addNoteDb,
} = require("./query");

const resetPassword = async (req, resp) => {
  try {
    const password = encrypt(req.query.new_password);
    const result = await resetPasswordDb(req.body.presentEmail, password);

    if (!result) {
      return resp.send({
        success: true,
        status: 400,
        message: "Data not found",
      });
    }
    resp.send({
      success: true,
      status: 200,
      message: "Password reset successfull",
    });
  } catch (err) {
    resp.send({
      success: false,
      status: 400,
      message: "some error occured",
      data: err,
    });
  }
};

const addReviews = async (req, resp) => {
  // try {
  const { email, review, noteId } = req.body;
  if (email != req.body.presentStudentEmail) {
    return resp.send({
      status: 400,
      message: "Please enter the correct email of your child",
    });
  }
  const data = await getNotesDb(email);
  if (!data) {
    return resp.send({
      status: 400,
      message: "This email id is not present in our database",
    });
  }

  for (let j = 0; j < data.notes.length; j++) {
    if (data.notes[j]._id == noteId) {
      for (let i = 0; i < review.length; i++) {
        encryptedReview = encrypt(review[i]);
        data.notes[j].review.push(encryptedReview);
      }
      data.notes[j].reviewFrom = req.body.presentName;
    }
  }

  const result = await addNoteDb(email, data.notes);

  resp.send({ status: 200, message: "Review added", data: req.body });
  // } catch (error) {
  //   resp.send({ status: 400, message: "error occured" });
  // }
};

const getMail = async (req, resp) => {
  try {

    let transporter = await nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure:false,
      auth: {
        user: 'donnber103@gmail.com',
        pass: 'hpim klsc htgn bftk'},
    });

    var mailOptions = {
      from:'donnber103@gmail.com',
      to:['bmaan6041@gmail.com'],
      subject:'OTP',
      text:`Your OTP is ${req.query.OTP}`
    }

    const sendMail = async (transporter, mailOptions) => {
      try{
        await transporter.sendMail(mailOptions);
        console.log("email has sent successfully")
      }catch(err){
        console.error(err);
      }
    }

    sendMail(transporter,mailOptions)

    

    resp.send("email Sent");

    // resp.send({
    //   success: true,
    //   status: 200,
    //   message: "Please check your email and confirm the OTP",
    // });
  } catch (error) {
    resp.send({ success: false, status: 400, message: "some error occured" });
  }
};

module.exports = { resetPassword, addReviews, getMail };
