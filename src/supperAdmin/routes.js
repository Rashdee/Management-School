const express = require('express');

const {loginCheckParents,LoginCheck} = require('./middleware');

const {supperLogin,loginPrinciple,adminLogin,userLogin,parentsLogin} = require('./controller')

const routerLogin = express.Router();

routerLogin.get('/SupperAdmin',LoginCheck,supperLogin);

routerLogin.get('/Principle', LoginCheck, loginPrinciple)

routerLogin.get('/Admin', LoginCheck, adminLogin)

routerLogin.get('/User', LoginCheck, userLogin)

routerLogin.get('/Parents', loginCheckParents, parentsLogin)

module.exports = routerLogin;