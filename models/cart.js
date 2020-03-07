const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    productid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        min: 1,
        required: true
    },
    unitprice: {
        type: Currency,
        min: 0,
        required: true
    }
}, {
    timestamps: true
});

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [itemSchema]
}, {
    timestamps: true
});

const Cart = mongoose.model('Item', cartSchema);

module.exports = Cart;

