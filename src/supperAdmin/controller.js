const express = require('express');
const {
    loginUsersUpdateDb,
    saveUserDb
  } = require("./query");
  


const supperLogin = async (req, resp) => {
    try {
        console.log("req.query.token",req.query.token);
      const result = await loginUsersUpdateDb(req.query.email, req.query.token);
      console.log("result",result);
  
      if (!result) {
        const data = new loginusers({
          email: req.query.email,
          userId: req.query._id,
          token: req.query.token,
        });
        const result = await saveUserDb(data);
      }
  
      return resp.send({success:true,status: 200,message:"Login Successfull",data:{ token: req.query.token}});
    } catch (err) {
      resp.send({
        success: false,
        status: 400,
        message: "some error occured",
        data: err,
      });
    }
  };

const loginPrinciple = async (req, resp) => {
    const result = await loginUsersUpdateDb(req.query.email, req.query.token);
  
  
    if (!result) {
      const data2 = new loginusers({
        email: req.query.email,
        userId: req.query._id,
        token: req.query.token,
      });
      const result = await saveUserDb(data2);
    }
  
    resp.status(200).send({
      status: 200,
      message: "login successfull",
      data: { token: req.query.token },
    });
  };

  const adminLogin = async (req, resp) => {
    const result = loginUsersUpdateDb(req.query.email, req.query.token);
  
    if (!result) {
      console.log("entered in else");
      const data = new loginusers({
        email: req.query.email,
        userId: req.query._id,
        token: req.query.token,
      });
      const result = await saveUserDb(data);
    }
  
    resp.status(200).send({
      status: 200,
      message: "login successfull",
      data: { token: req.query.token },
    });
  };

  const userLogin = async (req, resp) => {
    const result = loginUsersUpdateDb(req.query.email, req.query.token);
  
    if (!result) {
      console.log("entered in else");
      console.log("req.query._id", req.query._id);
      const data = new loginusers({
        email: req.query.email,
        userId: _id,
        token: req.query.token,
      });
      const result = await saveUserDb(data);
    }
    resp.status(200).send({
      success: true,
      status: 200,
      message: "login successfull",
      data: { token: req.query.token },
    });
  };

  const parentsLogin = async (req, resp) => {
    const result = await loginUsersUpdateDb(req.query.email, req.query.token);
    if (!result) {
      const data = new loginusers({
        email: req.query.email,
        userId: req.query._id,
        token: req.query.token,
      });
      const result = await saveUserDb(data);
    }
    resp.status(200).send({
      status: 400,
      message: "login successfull",
      data: { token: req.query.token },
    });
  };

  module.exports = {supperLogin,loginPrinciple,adminLogin,userLogin,parentsLogin}


