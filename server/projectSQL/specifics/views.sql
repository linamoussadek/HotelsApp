-- Show number of AVAILABLE rooms for specific hotel locations (cities) (VIEW 1)
create view num_available_rooms_in_city as
    select country, stateOrProvince, city, count(*) as num_available_rooms 
        from Room
        join Hotel on Room.hotelID = Hotel.hotelID
        join Address on Hotel.addressID = Address.addressID
		where (select count (*) = 0 from booking where 
	    	 		booking.roomNo = room.roomNo and 
	    	 		booking.hotelID = room.hotelID and
	    	 		(startDate <= current_date and endDate >= current_Date))
        group by country, stateOrProvince, city;

-- Show the rooms and capacities of specific hotels  (VIEW 2)
create view room_capacities_in_hotel as
	select hotelName, roomNo, capacity from Room
        join Hotel on Room.hotelID = Hotel.hotelID;

-- Show number of rooms for specific hotels (names)
create view num_rooms_in_hotel as
    select hotelName, count(*) as num_rooms from Room
        join Hotel on Room.hotelID = Hotel.hotelID
        group by hotelName;