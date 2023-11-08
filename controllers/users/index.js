const signup = require("./signup")
const login =require("./login")
const getCurrent = require("./getCurrent")
const logout =require("./logout")
const patchSubscription = require("./patchSubscription")
const updateAvatar = require ("./updateAvatar")

module.exports={
    signup,
    login,
    getCurrent,
    logout,
    patchSubscription,
    updateAvatar
}