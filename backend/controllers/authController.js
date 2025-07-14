const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    if(!firstName || !lastName || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        firstName,
        lastName,
        email, 
        phone,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser };