const express = require('express');
const app = express();

const routerLogin = require('./src/login/routes')
const routerPrinciple = require('./src/Principle/routes')
const routerTeacher = require('./src/Teacher/routes')
const routerStudent = require('./src/Students/routes');
const routerParent = require('./src/parents/routes');
const routerLocal = require('./src/local_api/routes')

const {checkTeacher, PrincipleCheck, checkUser, parentsCheck,validParents} = require('./src/middlewares/middleware')

app.use(express.json());

app.use('/Login',routerLogin);

app.use('/principle', PrincipleCheck, routerPrinciple);

app.use('/teacher', checkTeacher, routerTeacher);

app.use('/student', checkUser, routerStudent);

app.use('/parent', parentsCheck, routerParent);

app.use('/forgotPassword',routerParent)



app.use('/',routerLocal)



app.listen(5100);