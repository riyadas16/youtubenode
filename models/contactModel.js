const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your name first"],
  },
  email: {
    type: String,
    required: [true, "please write your email first"],
  },
  phone: {
    type: Number,
    required: [true, "please write your phone number first"],
  },
},{timestamps: true});


module.exports=mongoose.model('Contact', contactSchema)