const mongoose = require('mongoose');
const repeatedTripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
    },
    endPoint: {
        type: String,
        required: true,
    },
    repeatedNum: {
        type: Number,
        required: true,
    },
});

const repeatedTrip = mongoose.model('Repeated', repeatedTripSchema);
module.exports = repeatedTrip;
