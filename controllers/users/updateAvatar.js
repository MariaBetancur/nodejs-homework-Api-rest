const {User} = require ("../../models")
const path = require("path")
const fs = require("fs/promises")
const Jimp = require('jimp');


const avatarsDir = path.join(__dirname, "../../", "public","avatars")

 const updateAvatar = async (req,res)=>{
const {_id: id} = req.user;
const {path: tmpUpload, originalname} = req.file;
const avatarName =  `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
     Jimp.read(tmpUpload)
     .then(avatar => {
       return avatar
         .resize(250, 250) // resize 
         .write(resultUpload); // save
     })
     .catch(err => {
       console.error(err);
     });
     await fs.rename(tmpUpload,resultUpload)  
    const avatarURL = path.join("public","avatars",avatarName )
    await User.findByIdAndUpdate(id,{avatarURL})
    res.json({avatarURL})
} catch (error) {
      await fs.unlink(tmpUpload)
      throw error
  }
}

 module.exports = updateAvatar;