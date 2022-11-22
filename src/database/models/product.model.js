const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    filter: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    reviews: {
        type: Array,
        required: false
    },
    soldoff: {
        type: Boolean,
        required: true
    }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;