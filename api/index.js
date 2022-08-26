const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.js');
const authenticationRoute = require('./routes/authentication.js');
const shoppingCartRoute = require("./routes/shoppingCart.js");
const productRoute = require("./routes/product.js");
const orderRoute = require("./routes/order.js");
const stripeRoute = require("./routes/stripe.js");
const cors = require("cors");

require('dotenv').config();

const app = express();

// use 'then', if connection is successful, output message, otherwise error
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('DB Connection Successfull!'))
        .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authenticationRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", shoppingCartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running!");
});