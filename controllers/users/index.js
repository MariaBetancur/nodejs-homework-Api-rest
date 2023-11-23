const signup = require("./signup")
const login =require("./login")
const getCurrent = require("./getCurrent")
const logout =require("./logout")
const patchSubscription =require("./patchSubscription")
const updateAvatar = require ("./updateAvatar")
const verifyEmail = require("./verifyEmail")
const reVerifyEmail = require("./reVerifyEmail")

module.exports={
    signup,
    login,
    getCurrent,
    logout,
    patchSubscription,
    updateAvatar,
    verifyEmail,
    reVerifyEmail
    
}