const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please write your username"],
  },
  useremail: {
    type: String,
    unique:[true,"it already taken"],
    required: [true, "please write your useremail "],
  },
  password: {
    type: String,
    required: [true, "please write your user password"],
  },
},{timestamps: true});


module.exports=mongoose.model('User', userSchema)