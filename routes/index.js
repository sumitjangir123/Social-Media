const express =require('express');
const router=express.Router();

console.log("router loaded !!");


//setting home file controller
const homeController=require('../controllers/home_controller');

router.get("/",homeController.home);
router.use("/user",require("./users"));
router.use("/post",require("./posts"));
router.use("/comment",require('./comments'));
//make it for outer index.js
module.exports =router;