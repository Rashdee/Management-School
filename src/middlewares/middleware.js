const express = require("express");
const { verify } = require("jsonwebtoken");
require("dotenv").config();
require("../connections/connection");
const { loginSchema } = require("../joi_validation/loginSchema");
const {createSchema, studentCreateSchema, updateDeleteSchema} = require("../joi_validation/mutipleSchema")
const {  decrypt } = require("../allTokens/token");
const jwtToken = require("../allTokens/jwtToken");

const code = "itsSecreateKey";
let presentToken = null;
let presentRole = "";
let presentEmail = "";
let presentName;
let presentStudentEmail;
let OTP;
let presentId;

const {
  parentsDb,
} = require("../queries/query");

const {supperLoginDb,principleLoginDb,adminLoginDb,userLoginDb} = require('../login/query')

const LoginCheck = async (req, resp, next) => {
  const { error } = loginSchema.validate(req.query);
  if (error) {
    return resp.status(400).send(error);
  }
  let data;
  switch(req.headers.role){
    case "supper Admin":{ data = await supperLoginDb(req.query.email); break;}
    case "principle" :{ data = await principleLoginDb(req.query.email); break;}
    case "Admin" :{ data = await adminLoginDb(req.query.email); break;}
    case "user" :{ data = await userLoginDb(req.query.email);}
   }

  if (!data) {
    return resp.send({
      success: false,
      status: 400,
      message: "Your data just not exist",
      data: {},
    });
  }

  const password = decrypt(data.password);
  if (password !== req.query.password) {
    return resp.send("Your password didn't matchs");
  }
  const _id = data._id;

  presentToken = await jwtToken({ _id });

  req.query.token = presentToken;
  req.query._id = data._id;

  presentRole = data.role;
  presentEmail = data.email;
  presentName = data.name;

  next();
};

const loginCheckParents = async (req, resp, next) => {
  const { error } = loginSchema.validate(req.query);
  if (error) {
    return resp.status(400).send(error);
  }

  let data = await parentsDb(req.query.email);

  if (!data) {
    return resp.send({
      success: false,
      status: 400,
      message: "Your data just not exist",
      data: {},
    });
  }

  const password = decrypt(data.parents_password);
  if (password !== req.query.password) {
    return resp.send({
      success: false,
      status: 400,
      message: "Your password didn't matchs",
    });
  }
  const _id = data._id;

  presentToken = await jwtToken({ _id });

  req.query.token = presentToken;
  req.query._id = data._id;

  presentRole = "parent";
  presentEmail = data.parents_email;
  presentName = data.parents_name;
  presentStudentEmail = data.email;

  next();
};

const checkTeacher = async (req, resp, next) => {
  if (presentToken == null) {
    return resp.send({
      status: 400,
      message: "Please login yourself",
      data: [],
    });
  }
  try {
    const verifyToken = (token) => {
      try {
        const decoded = verify(token, code);
        return { success: true, data: decoded };
      } catch (error) {
        return { success: false, error: error.message };
      }
    };
    checkToken = verifyToken(presentToken);
    if (checkToken.success == false) {
      return resp.send({ status: 400, message: "Your token is expired" });
    }

    if (req.headers.token != presentToken) {
      return resp.send({
        status: 400,
        message: "Please enter valid token",
        data: [],
      });
    }
    const notElligible = ["Admin", "user", "parents"];

    if (notElligible.includes(presentRole)) {
      return resp.send({
        status: 400,
        message: "you are not authorized to do this",
        data: [],
      });
    }
    req.body.presentEmail = presentEmail;

    next();
  } catch (err) {
    resp.send({ success: false, status: 400, message: "some error occurred" });
  }
};

const checkUser = async (req, resp, next) => {
  if (presentToken == null) {
    return resp.send({
      status: 400,
      message: "Please login yourself",
      data: [],
    });
  }
  try {
    const verifyToken = (token) => {
      try {
        const decoded = verify(token, code);
        return { success: true, data: decoded };
      } catch (error) {
        return { success: false, error: error.message };
      }
    };
    checkToken = verifyToken(presentToken);
    if (checkToken.success == false) {
      return resp.send({ status: 400, message: "Your token is expired" });
    }

    if (req.headers.token != presentToken) {
      return resp.send({
        status: 400,
        message: "Please enter valid token",
        data: [],
      });
    }
    const notElligible = ["user", "parents", "parent"];

    if (notElligible.includes(presentRole)) {
      return resp.send({
        status: 400,
        message: "you are not authorized to do this",
        data: [],
      });
    }
    req.body.presentEmail = presentEmail;
    req.body.presentName = presentName;

    next();
  } catch (err) {
    resp.send({ success: false, status: 400, message: "some error occurred" });
  }
};

const parentsCheck = async (req, resp, next) => {
  if (presentToken == null) {
    return resp.send({
      status: 400,
      message: "Please login yourself",
      data: [],
    });
  }
  try {
    const verifyToken = (token) => {
      try {
        const decoded = verify(token, code);
        return { success: true, data: decoded };
      } catch (error) {
        return { success: false, error: error.message };
      }
    };
    checkToken = verifyToken(presentToken);
    if (checkToken.success == false) {
      return resp.send({ status: 400, message: "Your token is expired" });
    }

    if (req.headers.token != presentToken) {
      return resp.send({
        status: 400,
        message: "Please enter valid token",
        data: [],
      });
    }

    if (presentRole != "parent") {
      return resp.send({
        status: 400,
        message: "you are not authorized to do this",
        data: [],
      });
    }
    req.body.presentEmail = presentEmail;
    req.body.presentName = presentName;
    req.body.presentStudentEmail = presentStudentEmail;

    next();
  } catch (err) {
    resp.send({ success: false, status: 400, message: "some error occurred" });
  }
};

const PrincipleCheck = async (req, resp, next) => {
  
  try {
    if (presentToken == null) {
      return resp.send({
        status: 400,
        message: "Please login yourself",
        data: [],
      });
    }
    
    const verifyToken = (token) => {
        const decoded = verify(token, code);
        return { success: true, data: decoded };
    };
    checkToken = verifyToken(presentToken);
    if (checkToken.success == false) {
      return resp.send({ status: 400, message: "Your token is expired" });
    }

    if (req.headers.token != presentToken) {
      return resp.send({
        status: 400,
        message: "Please enter valid token",
        data: [],
      });
    }

    if (presentRole != "supper Admin") {
      return resp.send({
        status: 400,
        message: "you are not authorized to do this",
        data: [],
      });
    }
    req.body.presentEmail = presentEmail;
    req.body.presentName = presentName;

    next();
  } catch (err) {
    resp.send({ success: false, status: 400, message: "some error occurred" });
  }
};

const createCheck = async (req, resp, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    return resp.status(400).send(error);
  }
  next();
}

const studentCreateCheck = async (req, resp, next) => {
  const { error } = studentCreateSchema.validate(req.body);
  if (error) {
    return resp.status(400).send(error);
  }
  next();
}

const updateCheck = async (req,resp,next) => {
  const {error} = updateDeleteSchema.validate(req.body);
  if (error) {
    return resp.status(400).send(error);
  }
  next();
}

const deleteCheck = async (req,resp,next) => {
  const {error} = updateDeleteSchema.validate(req.query);
  if (error) {
    return resp.status(400).send(error);
  }
  next();
}

const validParents = async (req,resp,next) => {
  try{
   presentToken = null;
   let data = await parentsDb(req.query.email);
   if(!data){return resp.send({success:false,status:400,message:"data not found"})}

   OTP = Math.floor(1000 + Math.random() * 9000);
   req.query.OTP = OTP;

  presentEmail = data.parents_email;

  console.log(OTP);

   next();

  }catch(error){
    resp.send({success:false,status:400,message:"some error occured"})
  }
}

const confirmOTP = async (req,resp,next) => {
  try{
    if(!OTP){return resp.send({success: false, status:400, message:"Please first reset your password"})}
   console.log("req.query.OTP == OTP",req.query.OTP, OTP)
    if(req.query.OTP == OTP)
   {
    presentToken = "OK";

    return resp.send({success: true, status:200, message:"OTP confirmed, now you can enter your new password"})
   }
   else{return resp.send({success: false, status:400, message:"Your OTP not Matches"})}
  }catch(error){
    resp.send({success:false,status:400,message:"some error occured"})
  }
}

const confirmParent =  async (req,resp,next) => {
  try{
    if(presentToken != "OK"){return resp.send({success: false, status:400, message:"You can't directly enter your new password"})}
    req.body.presentEmail = presentEmail;
    console.log(req.body.presentEmail);
    next();
}catch(err){
return resp.send({success: false, status:400, message:err})}
}



module.exports = {
  LoginCheck,
  loginCheckParents,
  checkTeacher,
  checkUser,
  parentsCheck,
  PrincipleCheck,
  createCheck,
  studentCreateCheck,
  updateCheck,
  deleteCheck,
  validParents,
  confirmOTP,
  confirmParent
};
