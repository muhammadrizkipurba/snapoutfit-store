const mongoose = require("mongoose");

const paypalPaymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
})

const PaypalPayment = mongoose.model('PaypalPayment', paypalPaymentSchema);

module.exports = { PaypalPayment }