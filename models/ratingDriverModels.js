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

    launchingdataaccuracy: {
      type: String,
      required: true,
    },
    arrivingdataaccuracy: {
      type: String,
      required: true,
    },
  }
  ],
  ratingFormBehaviors: [{
    customersaroundbehaviorsandsaviorfaire: {
      type: String,
      required: true,
    },
  }
  ],

});

const RatingDD = mongoose.model('RatingDD', ratingSchema);

module.exports = RatingDD;
