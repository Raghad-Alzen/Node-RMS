const express = require("express");
const router = express.Router();
const Admin = require ("../models/adminModels.js");
const Customer = require ("../models/customerModels.js");
const Driver = require ("../models/driverModels.js");
const Rating = require ("../models/ratingCustomerModels.js");
const repeatedTrip = require ("../models/repeatedModels.js");
const Trip = require ("../models/tripModels.js");


                                    ////  Customer

router.put("/updateCustomer/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const customer = await Customer.findByIdAndUpdate(id, request.body);
    if (!customer)
      response.status(404).json({ message: 'cannot find user with id ${id} !' });
    else {
      const newcustomer = await Customer.findById(id);
      response.status(200).json(newcustomer);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.get("/get_allCustomer", async (request, response) => {
  try {
    const customer = await Customer.find({}).select('  firstName lastName ')
    response.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

                                    ////  Driver

router.post("/addDriver", async (request, response) => {
  try {
    const driver = await Driver.create(request.body);
    response.status(200).json(driver);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


router.put("/updateDriver/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const driver = await Driver.findByIdAndUpdate(id, request.body);
    if (!driver)
      response.status(404).json({ message: 'cannot find user with id ${id} !' });
    else {
      const newdriver = await Driver.findById(id);
      response.status(200).json(newdriver);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.delete("/deleteDriver/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver)
    response.status(404).json({ message: `cannot find driver with id ${id} !` });
    else response.status(200).json({ message: " delete driver" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


router.get("/get_allDriver", async (request, response) => {
  try {
    const driver = await Driver.find({});
    response.status(200).json(driver);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


                                    ////  Trip



router.post("/addTrip", async (request, response) => {
  const { startPoint, endPoint, driverName } = request.body;

  const foundDriver = await Driver.findOne({ driverName });

  if (!foundDriver) {
    return response.status(404).json({ error: "driver not found" });
  }

  const newTrip = new Trip({
    startPoint,
    endPoint,
    driverName: foundDriver.driverName, 
  });

  newTrip
    .save()
    .then((trip) => response.json(trip))
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: "Could not create trip" });
    });
});




router.put("/updateTrip/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trip = await Trip.findByIdAndUpdate(id, request.body);
    if (!trip)
      response.status(404).json({ message: 'cannot find user with id ${id} !' });
    else {
      const newtrip = await Trip.findById(id);
      response.status(200).json(newtrip);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.delete("/deleteTrip/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trip = await Trip.findByIdAndDelete(id);
    if (!trip)
    response.status(404).json({ message: `cannot find trip with id ${id} !` });
    else response.status(200).json({ message: " delete trip" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


router.get("/get_allTrip", async (request, response) => {
  try {
    const trip = await Trip.find({});
    response.status(200).json(trip);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.get("/all_finishedtrip", async (request, response) => {
  try {
    const trips = await Trip.find({});
    const finishedTrips = [];
    trips.forEach(trip => {
      if(trip.StatusTrip == "finished")
      finishedTrips.push(trip);
    });
    

    response.status(200).json(finishedTrips);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


module.exports = router;