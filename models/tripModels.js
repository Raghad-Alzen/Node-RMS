const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({

    tripName: {
        type: String,
        required: [true, "please enter user tripName !"]
    },
    tripTime: {
        type: Date,
        required: [true, "please enter user tripTime !"]
    },
    tripPrice: {
        type: Date,
        required: [true, "please enter user tripPrice !"]
    },
    tripTrack: {
        type: String,
        required: [true, "please enter tripTrack !"]
    },
    numberOfSeats: {
        type: Number,
        required: [true, "please enter numberOfSeats !"]
    },
    timeExpectedToArrive : {
        type: Date,
        required: [true, "please enter timeExpectedToArrive !"]
    },
    });
const Trip = mongoose.model('Trip',tripSchema);
module.exports = Trip;