const express = require('express');
const routerParent = express.Router();

const {resetPassword,addReviews, getMail} = require('./controller')

const {validParents, confirmOTP, confirmParent} = require('../middlewares/middleware')

routerParent.put("/resetPassword",resetPassword);

routerParent.put("/addReview",addReviews);

routerParent.get("/getMail",validParents,getMail)

routerParent.get("/confirmOTP",confirmOTP)

routerParent.put("/newPassword",confirmParent,resetPassword);


module.exports = routerParent;