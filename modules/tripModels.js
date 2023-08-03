const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({

    trapName: {
        type: String,
        required: [true, "please enter user trapName !"]
    },
    tripTime: {
        type: Date,
        required: [true, "please enter user tripTime !"]
    },
    tripPrice: {
        type: Date,
        required: [true, "please enter user tripPrice !"]
    },
      tripTrac: {
        type: String,
        required: [true, "please enter tripTrac !"]
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