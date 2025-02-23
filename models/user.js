const {Schema, model}= require("mongoose");
const Joi =require("joi");
const bcrypt = require("bcryptjs/dist/bcrypt");


const userSchema = Schema ({

    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,

      },
     subscription: {
       type: String,
       enum: ["starter", "pro", "business"],
       default: "starter"
     },
     token: {
       type: String,
       default: null,
  },
     avatarURL: {
      type: String,
      required: true
  }
   
}, {version:false,timestamps:true})

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

const joiUserSchema = Joi.object({
    email: Joi.string().required(),
    password:Joi.string().min(8).required(),
    subscription:Joi.string(),
    token:Joi.string(),
    
})

const joiSubscriptionSchema = Joi.object({
    subscription:Joi.string().valid("starter","pro","business").required()
})



const User = model ("user",userSchema)

module.exports = {
User,
joiUserSchema,
joiSubscriptionSchema
}