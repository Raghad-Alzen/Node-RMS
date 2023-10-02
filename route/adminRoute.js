const express = require("express");
const router = express.Router();
const Admin = require ("../models/adminModels.js");
const Customer = require ("../models/customerModels.js");
const Driver = require ("../models/driverModels.js");
const Rating = require ("../models/ratingCustomerModels.js");
const repeatedTrip = require ("../models/repeatedModels.js");
const Trip = require ("../models/tripModels.js");


                                    ////  Admin


router.post("/login", async (request, response) => {
  try {
      const { email, password } = request.body;

      const admin = await Admin.findOne({ email, password });
      if (admin) {
        return response.status(200).json({ role: "admin", message: "Admin login successful", id: admin._id, name: `${admin.firstName} ${admin.lastName}` });
      }

      return response.status(400).json({ error: "Invalid email or password" });
     } 
      catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
     }

    });



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
    const customer = await Customer.find({}).select(' firstName lastName gender phoneNumber email nationalNumber fatherName  motherName ');
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



//idTrip
router.post("/addTrip/:id", async (request, response) => {
  const { startPoint, endPoint } = request.body; 

  try {
    const { id } = request.params;
    const foundDriver = await Driver.findById(id);

    if (!foundDriver) {
      return response.status(404).json({ error: "Driver not found" });
    }

    const newTrip = new Trip({
      startPoint,
      endPoint,
      driver: foundDriver._id, 
    });

    await newTrip.save();

    response.json({ trip: newTrip ,name: `${foundDriver.firstName} ${foundDriver.lastName}` }); 
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Could not create trip" });
  }
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
   const trips = await Trip.find({}).lean();
   const driverIds = trips.map(trip => trip.driver);
   const drivers = await Driver.find({ _id: { $in: driverIds } });
  
   const customerIds = trips.map(trip => trip.customer);
   const customers = await Customer.find({ _id: { $in: customerIds } });
  
   const driverMap = {};
   drivers.forEach(driver => {
   driverMap[driver._id.toString()] = driver.firstName;
   });
  
   const customerMap = {};
   customers.forEach(customer => {
   customerMap[customer._id.toString()] = customer.firstName;
   });
  
   const tripsWithDriverAndCustomerNames = trips.map(trip => ({
   ...trip,
   driverName: driverMap[trip.driver] ,
   customerName: customerMap[trip.customer] , 
   }));
  
   response.status(200).json(tripsWithDriverAndCustomerNames);
   } catch (error) {
   console.log(error.message);
   response.status(500).json({ message: error.message });
   }
  });



  router.get("/all_finishedtrip", async (request, response) => {
     try {
     const trips = await Trip.find({ StatusTrip: "finished" }).lean(); 
    
     const driverIds = trips.map(trip => trip.driver);
     const drivers = await Driver.find({ _id: { $in: driverIds } }).lean();
    
     const driverMap = {};
     drivers.forEach(driver => {
     driverMap[driver._id.toString()] = driver.firstName;
     });
    
     const finishedTripsWithDriverNames = trips.map(trip => ({
     ...trip,
     driverName: driverMap[trip.driver] || 'Unknown',
     }));
    
     response.status(200).json(finishedTripsWithDriverNames);
     } catch (error) {
     console.log(error.message);
     response.status(500).json({ message: error.message });
     }
    });




module.exports = router;