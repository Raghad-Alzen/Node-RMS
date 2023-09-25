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
  }
  ],

  ratingFormTime: [{

    launchingDataAccuracy: {
      type: String,
      required: true,
    },
    arrivingDataAccuracy: {
      type: String,
      required: true,
    },
  }
  ],

  ratingFormBehaviors: [{
    customersAroundBehaviorsAndSaviorFaire: {
      type: String,
      required: true,
    },
  }
  ],

});

const RatingDriver = mongoose.model('RatingDriver', ratingSchema);

module.exports = RatingDriver;
