-- Show number of rooms for specific hotel locations (states/provinces)
create view num_rooms_in_area as
    select stateOrProvince, count(*) as num_rooms 
        from Room
        join Hotel on Room.hotelID = Hotel.hotelID
        join Address on Hotel.addressID = Address.addressID
        group by stateOrProvince;

-- Show number of rooms for specific hotels (names)
create view num_rooms_in_hotel as
    select hotelName, count(*) as num_rooms from Room
        join Hotel on Room.hotelID = Hotel.hotelID
        group by hotelName;