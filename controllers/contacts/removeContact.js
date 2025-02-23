const {Contact} = require("../../models")
const createError = require('http-errors');

const removeContact=async (req, res) => {
    const {contactId}=req.params;
    const result =await Contact.findByIdAndRemove(contactId)
      if(!result){
        throw createError(404,`Product  with id ${contactId} not found`)
      }
      res.json({status:"success",
      code:200,
      message:"contact deleted",
      data:{result
      }
    });
    
  }

  module.exports=removeContact