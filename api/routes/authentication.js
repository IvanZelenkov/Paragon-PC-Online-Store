const router = require('express').Router();
const User = require("../models/User.js");
const CryptoJS = require('crypto-js');
const JWT = require("jsonwebtoken");

// REGISTER
router.post("/register", async (request, response) => {
    const newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: CryptoJS.AES.encrypt(
            request.body.password, 
            process.env.PASSWORD_SECRET
        ).toString()
    });

    try {
        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json(error);
    }
});

// LOGIN
router.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });
        // assertion
        !user && response.status(401).json("Wrong credentials!");

        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASSWORD_SECRET
        ).toString(CryptoJS.enc.Utf8);

        // assertion
        decryptedPassword !== request.body.password && response.status(401).json("Wrong credentials!");

        const accessToken = JWT.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            }, 
            4994741,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        // MongoDB stores user data in the _doc folder, therefore we don't want to show password
        response.status(200).json({ ...others, accessToken });
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;