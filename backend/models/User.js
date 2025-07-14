const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@gmail\.com$/, 'Invalid email address']
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        match: [/^[5-9]{1}[0-9]{9}$/, 'Invalid Phone Number format. Must start with 5-9 and contain 10 digits']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])([^\s]){6,}$/, 'Invalid Password']
    }
});

module.exports = mongoose.model('User', userSchema);