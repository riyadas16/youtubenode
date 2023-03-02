const asyncHandler = require('express-async-handler');
const Contact =require('../models/contactModel')



const getContact = asyncHandler(async(req,res)=>{
    
    const contacts=await Contact.find()
    res.status(200).json(contacts);
})

const createContact=asyncHandler(async(req,res)=>{

    const {name,email,phone}=req.body;
    if(!phone || !name || !email)
    {
        throw new Error('all are mandatory fields');
        // res.status(400);
    }
    const contacts=await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json({contacts});
})

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findByIdAndDelete(req.params.id)
    if (!contact)
    {
        res.status(404)
        throw new Error('contact not found');
    }
  
    res.status(200).json(contact);
})
const putContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if (!contact)
    {
        res.status(404)
        throw new Error('contact not found');
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,req.body,{new:true}
    )
    
    res.status(200).send(updatedContact);
})
const getoneContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if (!contact)
    {
        res.status(404)
        throw new Error('contact not found');
    }
    
    res.status(200).json(contact);
})


module.exports={getContact,createContact,deleteContact,putContact,getoneContact}