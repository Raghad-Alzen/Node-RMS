const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModels.js");
const Trip = require("../models/tripModels.js");
const rating = require("../models/ratingModels.js");
const repeatedTrip = require("../models/repeatedTrip.js");


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



router.post("/AddNewTrip1/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return response.status(400).json({ error: 'Trip not found.' });
    }

    const customer = await Customer.findById(request.body.customer.id);

    if (!customer) {
      return response.status(400).json({ error: 'Customer not found.' });
    }

    const repeatedTrips = await repeatedTrip.find({ startPoint: trip.startPoint, endPoint: trip.endPoint });

    if (repeatedTrips.length === 0) {
      await repeatedTrip.create({ startPoint: trip.startPoint, endPoint: trip.endPoint, repeatedNum: 1 });
    } else {
      const existingRepeatedTrip = repeatedTrips[0];
      existingRepeatedTrip.repeatedNum += 1;
      await existingRepeatedTrip.save();
    }

    trip.customer = request.body.customer;
    trip.StatusTrip = "effective";
    await trip.save();

    return response.status(200).json(trip);
  } catch (error) {
    console.error(error.message);
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





router.post("/getPrice1", async (request, response) => {
  try {
    const { startPoint, endPoint } = request.body;
    if (!startPoint || !endPoint) {
      return response.status(400).json({ error: 'Both startPoint and endPoint are required.' });
    }

     const fixedPrice = getFixedPrice(startPoint, endPoint);

    if (fixedPrice !== null) {
       return response.status(200).json({ price: fixedPrice });
    } else {
       return response.status(400).json({ error: 'No predefined price found for this combination.' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});






 function getFixedPrice(startPoint, endPoint) {
   const fixedPrices ={
    'Aleppo-Homs': 1000,
    'Homs-Aleppo': 1000,
    'Aleppo-Damascus': 1500,
    'Damascus-Aleppo': 1500,
    'Aleppo-Latakia': 1200,
    'Latakia-Aleppo': 1200,
    'Homs-Damascus': 1300,
    'Damascus-Homs': 1300,
    'Homs-Latakia': 1100,
    'Latakia-Homs': 1100,
    'Damascus-Latakia': 1400,
    'Latakia-Damascus': 1400,
    'Latakia-Tartus': 1300,
    'Tartus-Latakia': 1300,
    'Aleppo-Tartus': 2000,
    'Tartus-Aleppo': 2000,
    'Aleppo-Raqqa': 1800,
    'Raqqa-Aleppo': 1800,
    'Aleppo-Idlib': 1600,
    'Idlib-Aleppo': 1600,
    'Aleppo-DeirEzzor': 2500,
    'DeirEzzor-Aleppo': 2500,
    'Aleppo-AlHasakah': 2200,
    'AlHasakah-Aleppo': 2200,
    'Homs-Latakia': 1100,
    'Latakia-Homs': 1100,
    'Homs-Tartus': 1200,
    'Tartus-Homs': 1200,
    'Homs-Raqqa': 1400,
    'Raqqa-Homs': 1400,
    'Homs-Idlib': 1600,
    'Idlib-Homs': 1600,
    'Homs-DeirEzzor': 1800,
    'DeirEzzor-Homs': 1800,
    'Homs-AlHasakah': 2000,
    'AlHasakah-Homs': 2000,
    'Damascus-Latakia': 1400,
    'Latakia-Damascus': 1400,
    'Damascus-Tartus': 1200,
    'Tartus-Damascus': 1200,
    'Damascus-Raqqa': 1600,
    'Raqqa-Damascus': 1600,
    'Damascus-Idlib': 1800,
    'Idlib-Damascus': 1800,
    'Damascus-DeirEzzor': 2200,
    'DeirEzzor-Damascus': 2200,
    'Damascus-AlHasakah': 2500,
    'AlHasakah-Damascus': 2500,
    'Latakia-Tartus': 1300,
    'Tartus-Latakia': 1300,
    'Latakia-Raqqa': 1600,
    'Raqqa-Latakia': 1600,
    'Latakia-Idlib': 1800,
    'Idlib-Latakia': 1800,
    'Latakia-DeirEzzor': 2200,
    'DeirEzzor-Latakia': 2200,
    'Latakia-AlHasakah': 2500,
    'AlHasakah-Latakia': 2500,
    'Tartus-Raqqa': 1800,
    'Raqqa-Tartus': 1800,
    'Tartus-Idlib': 2000,
    'Idlib-Tartus': 2000,
    'Tartus-DeirEzzor': 2200,
    'DeirEzzor-Tartus': 2200,
    'Tartus-AlHasakah': 2500,
    'AlHasakah-Tartus': 2500,
    'Raqqa-Idlib': 1800,
    'Idlib-Raqqa': 1800,
    'Raqqa-DeirEzzor': 2000,
    'DeirEzzor-Raqqa': 2000,
    'Raqqa-AlHasakah': 2200,
    'AlHasakah-Raqqa': 2200,
    'Idlib-DeirEzzor': 2200,
    'DeirEzzor-Idlib': 2200,
    'Idlib-AlHasakah': 2400,
    'AlHasakah-Idlib': 2400,
    'DeirEzzor-AlHasakah': 2000,
    'AlHasakah-DeirEzzor': 2000,
    'As Suwaida-Homs': 60000,
    'Homs-As Suwaida': 60000,
    'As Suwaida-Homs': 60000,
    'Damascus-As Suwaida': 60000,
    'As Suwaida-Damascus': 60000,
    'Aleppo-As Suwaida': 60000,
    'As Suwaida-Aleppo': 60000,
    'Latakia-As Suwaida': 60000,
    'As Suwaida-Latakia': 60000,
    'Tartus-As Suwaida': 60000,
    'As Suwaida-Tartus': 60000,
    'Raqqa-As Suwaida': 60000,
    'As Suwaida-Raqqa': 60000,
    'Idlib-As Suwaida': 60000,
    'As Suwaida-Idlib': 60000,
    'DeirEzzor-As Suwaida': 60000,
    'As Suwaida-DeirEzzor': 60000,
    'AlHasakah-As Suwaida': 60000,
    'As Suwaida-AlHasakah': 60000,
  }
  
  
  

  const key = `${startPoint}-${endPoint}`;
  return fixedPrices[key] !== undefined ? fixedPrices[key] : null;
}




router.put("/updateCustomer_info/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { motherName } = request.body;
    const { fatherName } = request.body;
    const { nationalNumber } = request.body;
    const customer = await Customer.findByIdAndUpdate(id, 
      {motherName},
      {fatherName},
      {nationalNumber},
      //{new: true}
      );

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



router.put("/updateTrip_info/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { tripTime } = request.body;
    const trip = await Trip.findByIdAndUpdate(id, 
      {tripTime},
      //{new: true}
      );

    if(!trip)
    response
    .status(404)
    .json({ message: 'cannot find user with id ${id} !'});
  else {
    const newtrip = await Trip.findById(id);
    response.status(200).json(newtrip);
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
      return response.status(400).json({ error: 'error.' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


router.get("/checkTrip3/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trips = await Trip.find({ "customer.id": id }); // Filter trips by customer ID
    const customer = await Customer.findById(id);
    
    if (trips && customer) {
      const today = new Date();
      
      // Update the status of trips in the past
      trips.forEach(async (trip) => {
        if (trip.tripTime < today) {
          trip.StatusTrip = "finished";
          await trip.save(); // Save the updated trip
        }
      });

      const filteredTrips = trips.filter((trip) => trip.StatusTrip === "finished");

      response.status(200).json(filteredTrips);
    } else {
      response.status(404).json({ message: "Customer or trips not found." });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});



function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = router;
