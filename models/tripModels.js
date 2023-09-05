const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({

    startPoint: {
        type: String,
        
        required: [false, "please enter user startPoint !"]
    },
    endPoint: {
        type: String,
        required: [false, "please enter user endPoint !"]
    },

    tripPrice: {
        type: String,
        required: [false, "please enter user tripPrice !"]
    },

    tripName: {
        type: String,
        required: [false, "please enter user tripName !"]
    },

    
    tripTime: {
        type: Date,
        required: [false, "please enter user tripTime !"]
    },

    StatusTrip: {
        type: String,
        required: [false, "please enter user StatusTrip !"],
        enum: ['effective', 'canceled', 'finished']

    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: [false, "Please enter the customer ID"],
      },
    
    // tripTrack: {
    //     type: String,
    //     required: [true, "please enter tripTrack !"]
    // },
    // numberOfSeats: {
    //     type: Number,
    //     required: [true, "please enter numberOfSeats !"]
    // },
    // timeExpectedToArrive : {
    //     type: Date,
    //     required: [true, "please enter timeExpectedToArrive !"]
    // },
    });
const Trip = mongoose.model('Trip',tripSchema);
module.exports = Trip;