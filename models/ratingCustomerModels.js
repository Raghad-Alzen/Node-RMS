const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({

  ratingFormBus: [{

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
    busDiverSafetyDriving: {
      type: String,
      required: true,
    },
    baggageTransportingService: {
      type: String,
      required: true,
    },
    
  }
  ],

  ratingFormTime: [{

    arrivingDataAccuracy: {
      type: String,
      required: true,
    },
    launchingDataAccuracy: {
      type: String,
      required: true,
    },
    
  }
  ],

  ratingFormBehaviors: [{

    busDriverBehaviorsAndSaviorFaire: {
      type: String,
      required: true,
    },
    customersAroundBehaviorsAndSaviorFaire: {
      type: String,
      required: true,
    },
  }
  ],

});

const RatingCustomer = mongoose.model('RatingCustomer', ratingSchema);

module.exports = RatingCustomer;
