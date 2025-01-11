import express from 'express';
import usercontroller from './user.controller.js';
let userrouter=express.Router();
userrouter.post('/signup',usercontroller.signup);
userrouter.post('/login',usercontroller.login);




export default   userrouter ;

// import express from 'express';
// import usercontroller from './user.controller.js';

// const userrouter = express.Router();

// userrouter.post('/signup', usercontroller.signup);
// userrouter.post('/login', usercontroller.login);

// export default userrouter;