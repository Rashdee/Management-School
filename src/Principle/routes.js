const express = require('express');
const routerPrinciple = express.Router();
const {createPrinciple,updatePrinciple,deletePrinciple} = require('./controller')

const {createCheck, updateCheck, deleteCheck} = require('../middlewares/middleware')

routerPrinciple.post("/create",createCheck, createPrinciple);

routerPrinciple.put("/update",updateCheck, updatePrinciple);

routerPrinciple.delete("/delete",deleteCheck, deletePrinciple);

module.exports = routerPrinciple