
const principles = require('../connections/model/principle');
require("../connections/connection");

const {decrypt,encrypt} = require('../allTokens/token');

const {getNotesDb, getannouncementDb} = require('./query')


const getNotes = async (req, resp) => {
  try {
    const data = await getNotesDb(req.query.email);

    if (!data) {
      return resp.send({ status: 400, message: "your data is not present" });
    }

    if (data.notes.length == 0) {
      return resp.send({ status: 400, message: "No note is available" });
    }


    for (let j = 0; j < data.notes.length; j++) {
      const new_review = [];
      decryptedNote = decrypt(data.notes[j].note);
      data.notes[j].note = decryptedNote;
      console.log("data.notes[j].note", data.notes[j].note);
      console.log("data.notes[j].review.length", data.notes[j].review.length);
      for (let i = 0; i < data.notes[j].review.length; i++) {
        decryptedReview = decrypt(data.notes[j].review[i]);
        new_review.push(decryptedReview);
      }
      data.notes[j].review = new_review;
    }
    
   return resp.send({
      status: 200,
      message: "successfully loaded",
      data: data.notes,
    });
  } catch (err) {
    resp.send(err);
  }
};


const getAnnouncement = async (req, resp) => {
  // try {
    let data = await getannouncementDb(req.query.target);
    
    let resultdata=[];
    console.log("data",data);
    if (!data) {
      return resp.send({ status: 400, message: "Data not found" });
    }

    for (let i = 0; i < data.length; i++) {
      let decryptedAnnouncement = decrypt(data[i].announcement)
      resultdata.push({announcement:decryptedAnnouncement,from:data[i].from})
    }


    resp.send({
      success:true,
      status: 200,
      message: "successfully loaded",
      data: resultdata ,
    });
  // } catch (err) {
  //   resp.send({success:false,
  //     status: 400,
  //     message:"some error occured"});
  // }
};

module.exports = {getNotes,getAnnouncement}