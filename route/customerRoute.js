const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModels.js");
const Trip = require("../models/tripModels.js");
const rating = require("../models/ratingModels.js");
const repeatedTrip = require("../models/repeatedTrip.js");

// router.get("/get_allCustomer", async (request, response) => {
//   try {
//     const customer = await Customer.find({});
//     response.status(200).json(customer);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message });
//   }
// });


// router.put("/updateCustomer_info/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const customer = await Customer.findByIdAndUpdate(id, request.body);
//     if(!customer)
//     response
//     .status(404)
//     .json({ message: 'cannot find user with id ${id} !'});
//   else {
//     const newcustomer = await Customer.findById(id);
//     response.status(200).json(newcustomer);
//   }  
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message});
//   }
// });


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


router.post("/rating-bus", async (request, response) => {
  try {
    var typeOfRating = request.body.ratingType;
    switch (typeOfRating) {
      case "bus": 
        var ratingFormBus = request.body.ratingForm;
        const rating1 = await Rating.create(ratingFormBus);
        response.status(200).json(rating1);
        break;
      case "time": 
        var ratingFormTime = request.body.ratingForm;
        const rating2 = await Rating.create(ratingFormTime);
        response.status(200).json(rating2);
        break;
      case "behaviors": 
        var ratingFormBehaviors = request.body.ratingForm;
        const rating3 = await Rating.create(ratingFormBehaviors);
        response.status(200).json(rating3);
        break;
      default:
        response.status(400).json({ message: "Invalid rating type" });
        break;
    }
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});



  
  // const { seatsComfortable, busQuiet, airConditioning, baggageTransportingService, busDiverSafetyDriving } = request.body;

  // const validRatings = ['excellent', 'good', 'bad'];

  // try {
  //   if (validRatings.includes(seatsComfortable) &&
  //     validRatings.includes(busQuiet) &&
  //     validRatings.includes(airConditioning) &&
  //     validRatings.includes(busDiverSafetyDriving) &&
  //     validRatings.includes(baggageTransportingService) &&
  //     trip._id
  //   ) {
  //     rating.trip._id = trip._id;

  //     rating.seatsComfortable = seatsComfortable;
  //     rating.busQuiet = busQuiet;
  //     rating.airConditioning = airConditioning;
  //     rating.busDiverSafetyDriving = busDiverSafetyDriving;
  //     rating.baggageTransportingService = baggageTransportingService;
  //     response.status(200).json({ message: "Thank you for your rating!" });
  //   } else {
  //     response.status(422).json({ message: "Please enter a valid rating for seat comfort and quietness of the bus." });
  //   }
  // } catch (error) {
  //   response.status(500).json({ message: "Internal Server Error" });
  // }




// router.post("/AddNewTrip/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const trip = await Trip.findById(id);
//     const repeated = await repeatedTrip.findById(id);
//     if (trip) {
//       repeated.forEach(tripp => {
//         if (tripp.startPoint == repeated.startPoint && tripp.endPoint == repeated.endPoint) {
//           repeated.repeatedNum += 1;
//         } else {
//           repeatedTrip.create({ startPoint: tripp.startPoint, endPoint: tripp.endPoint, repeatedNum: 1 });
//         }
//       })
//       const customer = await Customer.findById(request.body.customer.id);
//       if (customer) {
//         trip.customer = request.body.customer;
//         trip.StatusTrip = "effective";
//       }

//       return response.status(200).json(trip);
//     } else {
//       return response.status(400).json({ error: 'Both startPoint and endPoint are required.' });
//     }
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message });
//   }
// });

router.post("/AddNewTrip/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trip = await Trip.findById(id);
    const repeted = await repeatedTrip.findById(id);
    if (trip) {
      repeted.forEach(tripp => {
        if (tripp.startPoint == repeted.startPoint && tripp.endPoint == repeted.endPoint) {
          repeted.repeatedNum += 1;
        } else {
          repetedTrip.create({ startPoint: tripp.startPoint, endPoint: tripp.endPoint, repeatedNum: 1 });
        }
      })
      const customer = await Customer.findById(request.body.customer.id);
      if (customer) {
        trip.customer = request.body.customer;
        trip.StatusTrip = "effective";
      }

      return response.status(200).json(trip);
    } else {
      return response.status(400).json({ error: 'Both startPoint and endPoint are required.' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.post("/getPrice", async (request, response) => {
  try {
    console.log("in try");
    console.log(request.body);
    const trip = await Trip.create(request.body);
    if (!request.body.startPoint || !request.body.endPoint) {
      return response.status(400).json({ error: 'Both startPoint and endPoint are required.' });
    } else {
      trip.tripPrice = getRandomArbitrary(1000, 5000);
      return response.status(200).json(trip);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
})

router.post("/cancelTrip/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trip = await Trip.findById(id);

    if (trip) {
      trip.StatusTrip = "canceled";
    } else {
      return response.status(400).json({ error: 'Both startPoint and endPoint are required.' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


router.get("/checkTrip/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trips = await Trip.find({});
    const customer = await Customer.findById(id);
    if (trips && customer) {
      trips.forEach(trip => {
        const today = new Date()
        if (trip.tripTime < today && trip.customer.id == id) {
          trip.StatusTrip = "finished";
        }
      })
      const filteredTrips = trips.filter(
        (trip) => trip.customer.id === id
      );
      return response.status(200).json(filteredTrips)
    } else {
      return response.status(400).json({ error: 'Both startPoint and endPoint are required.' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.get("/getTopTrip", async (request, response) => {
  try {
    const trip = await Trip.find({});
    response.status(200).json(trip)
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// router.get("/get_allCustomer", async (request, response) => {
//   try {
//     const customer = await Customer.find({});
//     response.status(200).json(customer);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message });
//   }
// });


module.exports = router;
