const {User} = require ("../../models")
const {Conflict}= require("http-errors");
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")
const { v4: uuidv4 }  = require("uuid");
const {sendEmail} = require("../../helpers")



const signup = async (req,res)=>{
const {email,password,} = req.body;
const user = await User.findOne({email})
if (user){
    throw new Conflict(`Email ${email} in use`)
}
const verificationToken = uuidv4()
const hasPassword =bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const avatarURL = gravatar.url(email)
const {subscription} = await User.create({email,password:hasPassword,avatarURL,verificationToken})

const mail = {
    to:email,
    subject:" Verification of email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm the email</a>`

}
await sendEmail(mail)

res.status(201).json({
    status:"created",
    code:201,
    user:{
      email,
      subscription,
      avatarURL,
      verificationToken

       
    
}})
}

module.exports = signup;