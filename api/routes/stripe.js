const router = require("express").Router();
const stripe = require("stripe")("sk_test_51Kx4rbEcseKSxGGfN21TkbinlAUfGSAomJGcCxT0kDIdFdL4RB4GopWsyboXaifQDa71rTUo2FyXfLLKgYqub4PX00U3MGAqqa");

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeError, stripeResponse) => {
            if (stripeError)
                res.status(500).json(stripeError);
            else
                res.status(200).json(stripeResponse);
        }
    );
});

module.exports = router;