const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModels.js");
const Driver = require("../models/driverModels.js");
const RatingDriver = require("../models/ratingDriverModels.js");
const Trip = require("../models/tripModels.js");


router.get('/getMyTrips/:driverId', async (request, response) => {
  try {
    const { driverId } = request.params;

    const trip = await Trip.find({ driver: driverId });

    if (trip.length === 0) {
      return response.status(404).json({ message: 'No trip found for the given driver ID' });
    }

    response.status(200).json(trip);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.get("/viewTripDescription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (trip) res.status(200).json(trip);
    else res.status(404).json({ message: "can't find trip" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/ratingDriver", async (request, response) => {
  try {
    const trip = await Trip.findById(request.body.tripId);
    if (trip) {
      var typeOfRating = request.body.ratingType;
      switch (typeOfRating) {
        case "bus":
          var ratingFormBus = request.body;
          const rating1 = await RatingDriver.create(ratingFormBus);
          response.status(200).json(rating1);
          break;
        case "time":
          var ratingFormTime = request.body.ratingFormTime;
          const rating2 = await RatingDriver.create(ratingFormTime);
          response.status(200).json(rating2);
          break;
        case "behaviors":
          var ratingFormBehaviors = request.body.ratingFormBehaviors;
          const rating3 = await RatingDriver.create(ratingFormBehaviors);
          response.status(200).json(rating3);
          break;
        default:
          response.status(400).json({ message: "Invalid rating type" });
          break;
      }
    } else {
      response.status(404).json({ message: "trip not found" });
    }

  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});












module.exports = router;