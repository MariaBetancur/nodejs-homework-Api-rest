const {User} = require ("../../models")
const {Conflict}= require("http-errors");
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")


const signup = async (req,res)=>{
const {email,password} = req.body;
const user = await User.findOne({email})
if (user){
    throw new Conflict(`Email ${email} in use`)
}
const hasPassword =bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const avatarURL = gravatar.url(email)
const {subscription} = await User.create({email,password:hasPassword,avatarURL})

res.status(201).json({
    status:"created",
    code:201,
    user:{
      email,
      subscription,
      avatarURL 
    
}})
}

module.exports = signup;