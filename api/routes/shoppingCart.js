const ShoppingCart = require("../models/ShoppingCart.js");
const { tokenVerification, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./tokenVerification.js");
const router = require("express").Router();

// CREATE CART
router.post("/", tokenVerification, async (request, response) => {
    const newCart = new ShoppingCart(request.body);

    try {
        const savedCart = await newCart.save();
        response.status(200).json(savedCart);
    } catch (error) {
        response.status(500).json(error);
    }
});

// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (request, response) => {
    try {
        const updatedCart = await ShoppingCart.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true }
    );
    response.status(200).json(updatedCart);
    } catch (error) {
        response.status(500).json(error);
    }
});

// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (request, response) => {
    try {
        await ShoppingCart.findByIdAndDelete(request.params.id);
        response.status(200).json("Shopping cart has been deleted...");
    } catch (error) {
        response.status(500).json(error);
    }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (request, response) => {
    try {
        const cart = await ShoppingCart.findOne({ userId: request.params.userId });
        response.status(200).json(cart);
    } catch (error) {
        response.status(500).json(error);
    }
});

// GET CARTS OF ALL USERS
router.get("/", verifyTokenAndAdmin, async (response) => {
    try {
        const carts = await ShoppingCart.find();
        response.status(200).json(carts);
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;