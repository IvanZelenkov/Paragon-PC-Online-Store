const router = require('express').Router();
const User = require('../models/User.js');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./tokenVerification.js');

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (request, response) => {
    if (request.body.password) {
        request.body.password =  CryptoJS.AES.encrypt(
            request.body.password, 
            4994741
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true});
        response.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (request, response) => {
    try {   
        await User.findByIdAndDelete(request.params.id);
        response.status(200).json('User has been deleted...');
    } catch (error) {
        response.status(500).json(error);
    }
});

// GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        const { password, ...others } = user._doc;
        response.status(200).json(others);
    } catch (error) {
        response.status(500).json(error);
    }
});

// GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (request, response) => {
    const query = request.query.new;
    try {
        // If any of the sort operations needs to be done in reverse order, use -1 in MongoDB query
        const users = query
            ? await User.find().sort({ _id: - 1}).limit(5) 
            : await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json(error);
    }
});

// GET USER STATISTICS
router.get('/stats', verifyTokenAndAdmin, async (response) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", _total: { $sum: 1 } } } // количетсво пользователей total за какой-то месяц id: 1 (январь)
        ]);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;