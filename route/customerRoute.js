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


router.get('/getMyTickets/:customerId', async (request, response) => {
  try {
    const { customerId } = request.params;

    const trip = await Trip.find({ customer: customerId });

    if (trip.length === 0) {
      return response.status(404).json({ message: 'No trip found for the given customer ID' });
    }

    response.status(200).json(trip);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});



router.get("/getTopTrip", async (request, response) => {
  try {
    const RepeatedTrip = await repeatedTrip.find({}).sort({ repeatedNum: -1 }); 
    response.status(200).json(RepeatedTrip);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.post("/cancelTrip/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return response.status(404).json({ error: 'Trip not found' });
    }

    trip.StatusTrip = "canceled";
    await trip.save();

    response.status(200).json({ message: 'Trip canceled successfully' });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal server error' });
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
          repeatedTrip.create({ startPoint: tripp.startPoint, endPoint: tripp.endPoint, repeatedNum: 1 });
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
//    console.log("in try");
//    console.log(request.body);
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



router.put("/updateCustomer_info/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const customer = await Customer.findByIdAndUpdate(id, request.body);
    if(!customer)
    response
    .status(404)
    .json({ message: 'cannot find user with id ${id} !'});
  else {
    const newcustomer = await Customer.findById(id);
    response.status(200).json(newcustomer);
  }  
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message});
  }
});


router.post("/Rating", async (request, response) => {
  try {
    var typeOfRating = request.body.ratingType;
    switch (typeOfRating) {
      case "bus": 
        var ratingFormBus = request.body.ratingFormBus;
        const rating1 = await rating.create(ratingFormBus);
        response.status(200).json(rating1);
        break;
      case "time": 
        var ratingFormTime = request.body.ratingFormTime;
        const rating2 = await rating.create(ratingFormTime);
        response.status(200).json(rating2);
        break;
      case "behaviors": 
        var ratingFormBehaviors = request.body.ratingFormBehaviors;
        const rating3 = await rating.create(ratingFormBehaviors);
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



function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = router;
