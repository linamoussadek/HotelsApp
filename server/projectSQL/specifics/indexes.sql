-- Booking index for retrieving Bookings for a specific hotel
create index booking_hotel_index on Booking (hotelID);

-- Contact indexes for retrieving contact info of hotels and chains
create index hotel_contact_index on HotelContact (hotelID);
create index chain_contact_index on ChainContact (chainID);