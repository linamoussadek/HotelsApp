-- Room index for customers searching for rooms by price and capacity
create index room_filter_index on Room (pricePerDay, capacity);

-- Booking index for retrieving Bookings a specific hotel
create index booking_hotel_index on Booking (hotelID);

-- Contact indexes for retrieving contact info of hotels and chains
create index hotel_contact_index on HotelContact (hotelID);
create index chain_contact_index on ChainContact (chainID);