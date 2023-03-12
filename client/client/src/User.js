const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    dob: Date,
    email: String,
    phone: String
});

module.exports = mongoose.model('User', userSchema);
