const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db");

// middleware
app.use(cors())
app.use(express.json())


// Routes

// Get all hotel chains
app.get("/hotelchains", async (req, res) => {
    try {
      const allHotelChains = await pool.query("select chainName from hotelchain")
      res.json(allHotelChains.rows)
    } catch (err) {
      console.error(err.message)
    }
});
// Get hotel chains in certain country
app.get("/hotelchains/:country", async (req, res) => {
  try {
    const { country } = req.params
    const countryHotels = await pool.query(
      "select chainName from hotelchain where hotelchain.addressID in (select addressID from address where country = $1)", [country]
    )
    res.json(countryHotels.rows)
  } catch (err) {
    console.error(err.message)
  }
});


// Get all rooms based on criteria
// Ex: http://localhost:3001/hotelchains/Le Ritz/hotels/Canada/3/5/rooms/4/300/dates/2021-10-30/2021-10-31
app.get("/hotelchains/:chainName/hotels/:country/:size/:rating/rooms/:capacity/:pricePerDay/dates/:start/:end", async (req, res) => {
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
});


// Can have multiple values in url (for filter) like this? Null if left blank
// get("/hotels/:hotelID/rooms/:roomID", (req, res) => {
//   const hotelID = req.params.hotelID || null
//   const roomID = req.params.roomID || null;
//   // Query the server with the hotelID and roomID values

    // COALESCE($1, country) --> if country is null, it returns the whole column
    // Note: '' is not the same as null - maybe check length of criteria - pass null if 0
// });

// Then call get with the url



const port = 3001
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})