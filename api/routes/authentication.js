const router = require('express').Router();
const User = require("../models/User.js");
const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (request, res) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
            res.status(201).json(savedUser);
    } catch (error) {
            console.log(error);
            res.status(500).json(error);
    }
});

// LOGIN
router.post('/login', async (request, res) => {
    try {
        const user = await User.findOne({ username: request.body.username });

        // assertion
        !user && res.status(400).json('wrong credentials');

        const isPasswordMatched = await bcrypt.compare(
            request.body.password,
            user.password
        );

        // assertion
        !isPasswordMatched && res.status(400).json('wrong credentials');

        const token = JWT.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        const { password, ...rest } = user._doc;

        res.status(200).json({ ...rest, token });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;