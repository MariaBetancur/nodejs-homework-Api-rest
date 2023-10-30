const {Contact} = require("../../models")

const getAllContacts = async (req, res) => {
  const {_id} = req.user;
  const {page = 1, limit = 20,favorite =false} = req.query;
  const skip = (page - 1) * limit;
 const contacts = await Contact.find({owner: _id,favorite},"",
    {skip,limit:Number(limit)}).populate("owner","_id name email subscription")
    res.json({
      status:"success",
      code:200,
      data: {
        result:contacts
      }   
   });
       
  }

  module.exports=getAllContacts