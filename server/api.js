const express = require('express')
const app = express()
const cors = require('cors')
const db = require("./elephant");

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
    const allHotelChains = await db.any("select chainName from hotelchain;")
    res.json(allHotelChains)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all countries and number of rooms in each country
app.get("/countryCapacities", async (req, res) => {
  try {
    const allCountries = await db.any(
      `select country, sum(num_available_rooms) from num_available_rooms_in_city
	      group by country order by country asc;`
    )
    res.json(allCountries)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all hotel capacities (number of rooms in hotels)
app.get("/hotelCapacities", async (req, res) => {
  try {
    const allHotelCapacities = await db.any("select distinct num_rooms from num_rooms_in_hotel order by num_rooms asc;")
    res.json(allHotelCapacities)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all room capacities
app.get("/roomCapacities", async (req, res) => {
  try {
    const allRoomCapacities = await db.any("select distinct capacity from room_capacities_in_hotel order by capacity asc;")
    res.json(allRoomCapacities)
    } catch (err) {
      console.error(err.message)
    }
});

// Get all hotel ratings
app.get("/hotelRatings", async (req, res) => {
  try {
    const allRatings = await db.any("select distinct rating from hotel order by rating asc;")
    res.json(allRatings)
    } catch (err) {
      console.error(err.message)
    }
});

// Get min and max price per day of room
app.get("/maxRoomPrice", async (req, res) => {
  try {
    const maxPrice = await db.one("select max(pricePerDay) as maxPrice from room;")
    res.json(maxPrice)
    } catch (err) {
      console.error(err.message)
    }
});


// Get all rooms based on criteria
// Ex: http://localhost:3001/hotelchains/Le Ritz/hotels/Canada/3/5/rooms/4/300/dates/2021-10-30/2021-10-31
app.get("/hotelChains/:chainName/hotels/:country/:size/:rating/rooms/:capacity/:pricePerDay/dates/:start/:end", async (req, res) => {
  try {
    let { chainName, country, size, rating, capacity, pricePerDay, start, end } = req.params
    chainName = 'null' ? null : chainName
    country = 'null' ? null : country
    size = 'null' ? null : size
    rating = 'null' ? null : rating
    capacity = 'null' ? null : capacity
    pricePerDay = 'null' ? null : pricePerDay
    start = 'null' ? null : start
    end = 'null' ? null : end

    console.log(req.params)
    const query = 
    `select hotelname, chainname, street, city, stateOrProvince, country, contactinfo,
    room.roomNo, pricePerDay, capacity, extendable, roomView, amenity, details from room 
    join hotel on room.hotelid = hotel.hotelid 
    join address on hotel.addressid = address.addressid
    join hotelchain on hotel.chainid = hotelchain.chainid
	  left join hotelcontact on hotel.hotelid = hotelcontact.hotelid
    left join amenity on room.roomNo = amenity.roomNo and room.hotelid = amenity.hotelid 
    left join damage on room.roomNo = amenity.roomNo and room.hotelid = damage.hotelid
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
	    	 ((startDate is null and endDate is null)
         or (startDate <= $7 and endDate >= $7)
	    	 or (startDate <= $8 and endDate >= $8)
	    	 or (startDate >= $7 and endDate <= $8))
	    	) order by hotelname, roomNo asc limit 25;
    `
    const hotelBookings = await db.any(
      query, [chainName, country, size, rating, capacity, pricePerDay, start, end]
    )
    res.json(hotelBookings)
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
    `select person.firstName, person.lastName, roomNo, booking.hotelID, hotelname, startDate, endDate from booking
    join person on person.ssn = (select ssn from customer where 
                  customer.customerID = booking.customerID)
    join hotel on booking.hotelID = hotel.hotelID
    where booking.hotelID in (select hotelID from worksAt where
                worksAt.employeeID = $1)
    and canceled = false
    and checkedIn = false
	  and endDate::date >= current_date;
    `
    const hotelBookings = await db.any(
      query, [employeeID]
    )
    res.json(hotelBookings)
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
    `select person.firstName, person.lastName, roomNo, booking.hotelID, hotelname, startDate, endDate from booking
    join person on person.ssn = (select ssn from customer where 
                  customer.customerID = booking.customerID)
    join hotel on booking.hotelID = hotel.hotelID
    where booking.hotelID in (select hotelID from worksAt where
                worksAt.employeeID = $1)
    and (canceled = true
    or checkedIn = true
	  or endDate::date < current_date);
    `
    const hotelBookingsHistory = await db.any(
      query, [employeeID]
    )
    res.json(hotelBookingsHistory)
  } catch (err) {
    console.error(err.message)
  }
})

// Get all employeeIDs
app.get("/employees", async (req, res) => {
  try {
    const { employeeID } = req.params
    const query = 
    `select employeeID, firstname, lastname from employee 
    join person on employee.ssn = person.ssn`
    const employee = await db.any(query, [employeeID])
    res.json(employee)
    console.log(employee)
    } catch (err) {
      console.error(err.message)
    }
});

// Update booking status to checkedIn
app.put("/bookingAccept/:employeeID/:roomNo/:hotelID", async (req, res) => {
  try {
    const { employeeID, roomNo, hotelID} = req.params;
    console.log(req.params)
    const acceptBooking = await db.none(
      "update booking set checkedIn = true, employeeID = $1 where roomNo = $2 and hotelID = $3",
      [employeeID, roomNo, hotelID]
    );
    res.json("Booking was checked in");
  } catch (err) {
    console.error(err.message);
  }
});
// Update booking status to canceled
app.put("/bookingCancel/:employeeID/:roomNo/:hotelID", async (req, res) => {
  try {
    const { employeeID, roomNo, hotelID} = req.params;
    console.log(req.params)
    const acceptBooking = await db.none(
      "update booking set canceled = true, employeeID = $1 where roomNo = $2 and hotelID = $3",
      [employeeID, roomNo, hotelID]
    );
    res.json("Booking was checked in");
  } catch (err) {
    console.error(err.message);
  }
});

// Port

const port = 3001
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})