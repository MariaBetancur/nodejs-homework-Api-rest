const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    verificationToken: String,
    verify: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);