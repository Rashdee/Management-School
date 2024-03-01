const teachers = require('../connections/model/teachers');
require("../connections/connection");

const {encrypt} = require('../allTokens/token')

const {saveUserDb, updateAdminDb, deleteAdminDb, getAllTeachersDb} = require('./query')


const createAdmin = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    const new_password = encrypt(password);
    const data = new teachers({
      name,
      email,
      password: new_password,
      role :"Admin",
      createdBy: req.body.presentEmail,
    });
    const result = await saveUserDb(data);
    resp.send({
      status: 200,
      message: "Admin created succesfully",
      data: result,
    });
  } catch (error) {
    resp.send({
      status: 400,
      meassage: "Please change email id and try again",
      data: [],
    });
  }
};

const updateAdmin = async (req, resp) => {
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

    dummyData.updatedBy = req.body.presentEmail;
    console.log("reached upto here in update admin");

    const result = await updateAdminDb(req.body._id, dummyData);
    resp.send({ status: 200, message: "Updated Successfully", data: dummyData });
  } catch (error) {
    resp.send(error);
  }
};

const deleteAdmin = async (req, resp) => {
  try {
    console.log("req.body._id", req.query._id);

    const result = await deleteAdminDb(req.query._id);

    if (!result) {
      return resp.send({
        success: false,
        status: 400,
        message: "data is not present",
      });
    }
    resp.send({ status: 400, message: "deleted Successfully", data: {name:result.name,email:result.email} });
  } catch (error) {
    resp.send({ status: 400, message: error });
  }
};

const getAllTeachers = async (req, resp) => {
  try {

    const data = await getAllTeachersDb();
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


module.exports = {createAdmin, updateAdmin, deleteAdmin, getAllTeachers}