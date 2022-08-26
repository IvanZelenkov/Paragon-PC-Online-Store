const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:      { type: String, required: true, unique: true },
        company:    { type: String, required: true },
        desc:       { type: String, required: true },
        img:        { type: String, required: true },
        category:   { type: Array, required: true },
        optionName: { type: String },
        options:    { type: Array },
        price:      { type: Number, required: true },
        inStock:    { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);