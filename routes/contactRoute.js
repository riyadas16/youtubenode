const express=require('express');
const { getContact, createContact, deleteContact, putContact,getoneContact } = require('../controllers/contactController');
const router=express.Router();

router.route("/").get(getContact).post(createContact)
router.route("/:id").get(getoneContact).delete(deleteContact).put(putContact)


module.exports  = router;