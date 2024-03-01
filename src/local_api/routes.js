const express = require('express');
const routerLocal = express.Router();
const {getNotes,getAnnouncement} = require('./controller')

routerLocal.get("/getNotes", getNotes);

routerLocal.get("/getAnnouncement", getAnnouncement);


module.exports = routerLocal