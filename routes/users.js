const express =require('express');
const router=express.Router();
const passport=require('passport');

console.log("users router loaded !!!");

//setting up user controller call
const userController=require("../controllers/user_controller");

router.get("/signUp",userController.signUp);
router.get("/signIn",userController.signIn);
router.post("/create_user",userController.create_user);
router.get('/profile',passport.checkAuthentication,userController.profile);
//use passport as an middleware to authenticate
router.post("/create_session",passport.authenticate(
    'local',
    {failureRedirect : '/user/signIn'}
),userController.createSession);
router.get('/signOut',userController.destroySession);
//make it available for index.js
module.exports=router;
