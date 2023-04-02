const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db");

// Middleware

// Allow HTTP requests from other domains i.e localhost 3000 fetches from 3001
// https://www.stackhawk.com/blog/nodejs-cors-guide-what-it-is-and-how-to-enable-it/
app.use(cors())
// Parse JSON payloads
app.use(express.json())


// Routes (Queries)

// Get all hotel chains
// Ex: http://localhost:3001/hotelchains
app.get("/hotelChains", async (req, res) => {
  try {
    const allHotelChains = await pool.query("select chainName from hotelchain;")
    res.json(allHotelChains.rows)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all countries
app.get("/countries", async (req, res) => {
  try {
    const allCountries = await pool.query("select distinct country from address order by country asc;")
    res.json(allCountries.rows)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all hotel capacities (number of rooms in hotels)
app.get("/hotelCapacities", async (req, res) => {
  try {
    const allHotelCapacities = await pool.query("select distinct num_rooms from num_rooms_in_hotel order by num_rooms asc;")
    res.json(allHotelCapacities.rows)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all room capacities
app.get("/roomCapacities", async (req, res) => {
  try {
    const allRoomCapacities = await pool.query("select distinct capacity from room_capacities_in_hotel order by capacity asc;")
    res.json(allRoomCapacities.rows)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all hotel ratings
app.get("/hotelRatings", async (req, res) => {
  try {
    const allRatings = await pool.query("select distinct rating from hotel order by rating asc;")
    res.json(allRatings.rows)
    } catch (err) {
      console.error(err.message)
    }
});

// Get min and max price per day of room
app.get("/maxRoomPrice", async (req, res) => {
  try {
    const maxPrice = await pool.query("select max(pricePerDay) as maxPrice from room;")
    res.json(maxPrice.rows)
    } catch (err) {
      console.error(err.message)
    }
});


// Get all rooms based on criteria
// Ex: http://localhost:3001/hotelchains/Le Ritz/hotels/Canada/3/5/rooms/4/300/dates/2021-10-30/2021-10-31
app.get("/hotelChains/:chainName/hotels/:country/:size/:rating/rooms/:capacity/:pricePerDay/dates/:start/:end", async (req, res) => {
  try {
    const { chainName, country, size, rating, capacity, pricePerDay, start, end } = req.params
    console.log(req.params)
    const query = 
    `select hotelname, room.roomNo, pricePerDay, capacity, roomView, amenity, details from room 
    join hotel on room.hotelid = hotel.hotelid 
    join amenity on room.roomNo = amenity.roomNo and room.hotelid = amenity.hotelid 
    join damage on room.roomNo = amenity.roomNo and room.hotelid = damage.hotelid
    where room.hotelID in 
      (select hotelID from hotel where hotel.chainID in 
		    (select chainID from hotelchain where chainName = coalesce($1, chainName)
		     and hotel.addressID in 
		    	  (select addressID from address where country = coalesce($2, country))
		    )
	 	    and hotelID in (select hotelID from num_rooms_in_hotel where num_rooms >= coalesce($3, num_rooms))
	 	    and hotel.rating = coalesce($4, rating)
      )
      and room.capacity = coalesce($5, capacity)
      and room.pricePerDay <= coalesce($6, pricePerDay)
      and (select count (*) = 0 from booking where 
	    	 booking.roomNo = room.roomNo and 
	    	 booking.hotelID = room.hotelID and
	    	 ((startDate <= $7 AND endDate >= $7)
	    	 OR (startDate <= $8 AND endDate >= $8)
	    	 OR (startDate >= $7 AND endDate <= $8))
	    	);
    `
    const hotelBookings = await pool.query(
      query, [chainName, country, size, rating, capacity, pricePerDay, start, end]
    )
    res.json(hotelBookings.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// Get bookings based on employeeID's hotel that are not 'over' yet
// Ex: http://localhost:3001/employeeBookings/1
app.get("/employeeBookingsNotOver/:employeeID", async (req, res) => {
  try {
    const { employeeID } = req.params
    console.log(req.params)
    const query = 
    `select person.firstName, person.lastName, roomNo, hotelID, startDate, endDate from booking
    join person on person.ssn = (select ssn from customer where 
                  customer.customerID = booking.customerID)
    and booking.hotelID in (select hotelID from worksAt where
                worksAt.employeeID = $1)
    and canceled = false
    and checkedIn = false
	  and endDate >= current_date;
    `
    const hotelBookings = await pool.query(
      query, [employeeID]
    )
    res.json(hotelBookings.rows)
  } catch (err) {
    console.error(err.message)
  }
})


// Get booking history based on employeeID's hotel (cancelled/checked in/expired)
// Ex: http://localhost:3001/employeeBookings/1
app.get("/employeeBookingsOver/:employeeID", async (req, res) => {
  try {
    const { employeeID } = req.params
    console.log(req.params)
    const query = 
    `select person.firstName, person.lastName, roomNo, hotelID, startDate, endDate from booking
    join person on person.ssn = (select ssn from customer where 
                  customer.customerID = booking.customerID)
    and booking.hotelID in (select hotelID from worksAt where
                worksAt.employeeID = $1)
    and (canceled = true
    or checkedIn = true
	  or endDate < current_date);
    `
    const hotelBookingsHistory = await pool.query(
      query, [employeeID]
    )
    res.json(hotelBookingsHistory.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// Create an address, person, customer, and booking for new user
// Ideas: do everything in one post like below, or have seperaet for each
// app.post("/newCustomerBooking", async (req, res) => {
//   try {
//     const { street, city ... } = req.body;
//     const newCustomerBooking = await pool.query(
//       "insert ...",
//       [street, city ...]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// Create a customer

// Create a booking

// Create a booking based on an existing user

// Update booking status to cancelled

// Update booking status to checkedIn



// Port

const port = 3001
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})