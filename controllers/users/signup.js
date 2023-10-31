const {User} = require ("../../models")
const {Conflict}= require("http-errors");
const bcrypt = require("bcryptjs")


const signup = async (req,res)=>{
const {email,password} = req.body;
const user = await User.findOne({email})
if (user){
    throw new Conflict(`Email ${email} in use`)
}
const hasPassword =bcrypt.hashSync(password,bcrypt.genSaltSync(10));

const {subscription} = await User.create({email,password:hasPassword})

res.status(201).json({
    status:"created",
    code:201,
    user:{
      email,
      subscription
       
    
}})
}

module.exports = signup;