
const principles = require('../connections/model/principle');
require("../connections/connection");

const {encrypt} = require('../allTokens/token')

const {updatePrincipleDb, deletePrincipleDb, saveUserDb,getPrinciple} = require('./query')


const createPrinciple = async (req, resp) => {
    // try {
      const isDataPresent = await getPrinciple();
      if (isDataPresent) {
        return resp.send({
          success: false,
          status: 400,
          message: "Principle already present can't be added more",
        });
      }
  
      const { name, email, password } = req.body;
      const new_password = encrypt(password);
      const data = new principles({
        name,
        email,
        password: new_password,
        role: "principle",
      });
      const result = await saveUserDb(data);
      resp.send({
        status: 200,
        message: "principle created succesfully",
        data: result,
      });
    // } catch (error) {
    //   resp.send({
    //     status: 400,
    //     meassage: "some error occurred",
    //     data: [],
    //   });
    // }
  };
  
  const updatePrinciple = async (req, resp) => {
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
  
      console.log("reached upto here in update principle");
  
      const result = await updatePrincipleDb(req.body._id, dummyData);
      if (!result) {
        return resp.send({ status: 400, meassage: "Data not found" });
      }
      resp.send({ status: 200, message: "Updated Successfully", data: dummyData });
    } catch (error) {
      resp.send(error);
    }
  };
  
  const deletePrinciple = async (req, resp) => {
    try {
      
  
      const { _id } = req.query;
  
      const result = await deletePrincipleDb(_id);
      if (!result) {
        return resp.send({
          status: 400,
          meassage: "Data not found",
          data: result,
        });
      }
      resp.send({ status: 400, message: "deleted Successfully", data: {name:result.name,email:result.email} });
    } catch (error) {
      resp.send({ status: 400, message: error });
    }
  };

  module.exports = {createPrinciple,updatePrinciple,deletePrinciple}