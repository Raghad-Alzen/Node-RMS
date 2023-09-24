const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({

  ratingFormBus: {

    seatsComfortable: {
      type: String,
      required: true,
    },
    busQuiet: {
      type: String,
      required: true,
    },
    airConditioning: {
      type: String,
      required: true,
    },
    baggageTransportingService: {
      type: String,
      required: true,
    },
    busDiverSafetyDriving: {
      type: String,
      required: true,
    },
  }
  ,

  ratingFormTime: [{

    launchingdataaccuracylevel: {
      type: String,
      required: true,
    },
    arrivingdataaccuracylevel: {
      type: String,
      required: true,
    },
  }
  ],

  ratingFormBehaviors: [{

    busDriverbehaviorsandsaviorfaire: {
      type: String,
      required: true,
    },
    customersaroundbehaviorsandsaviorfaire: {
      type: String,
      required: true,
    },
  }
  ],

});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
