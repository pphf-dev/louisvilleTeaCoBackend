const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose); //load type for costs
const Currency = mongoose.Types.Currency; //assign currency middleware

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost_50g: {
        type: Currency,
        required: true
    },
    cost_100g: {
        type: Currency,
        required: true
    },
    cost_250g: {
        type: Currency,
        required: true
    },
    rare: {
        type: Boolean,
        default: false
    },
    best_seller: {
        type: Boolean,
        default: false
    },
    seasonal: {
        type: Boolean,
        default: false
    },
    iced: {
        type: Boolean,
        default: false
    },
    organic: {
        type: Boolean,
        default: false
    },
    LTC_blend: {
        type: Boolean,
        default: false
    },
    Kentucky: {
        type: Boolean,
        default: false
    },
    caffeinefree: {
        type: Boolean,
        default: false
    },
    OOS: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;