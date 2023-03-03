const express=require('express')
const {registerUser,loginUser,current}=require('../controllers/userController')
const router=express.Router()
const validateToken=require('../middleware/validateTokenHandler')




router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,current)
module.exports=router