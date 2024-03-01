
const principles = require('../connections/model/principle');
require("../connections/connection");

const getPrinciple = async() => {return await principles.findOne();}

const updatePrincipleDb = async (_id, dummyData) => {
    return await principles.findOneAndUpdate({ _id }, dummyData);
  };
  
  const deletePrincipleDb = async (_id) => {
    return await principles.findOneAndDelete({ _id });
  }
    
  const saveUserDb = async (data) => await data.save();

  module.exports = {updatePrincipleDb, deletePrincipleDb, saveUserDb,getPrinciple}
  