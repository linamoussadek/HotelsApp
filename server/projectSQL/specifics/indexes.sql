-- Indexes for the large booking query:
create index booking_hotel_address on Address (country, addressID);

create index booking_hotel_chain on HotelChain (chainName, chainID);
create index booking_chain_contact on ChainContact (chainID);

create index booking_hotel on Hotel (chainID, addressID, rating, hotelID);
create index booking_hotel_contact on HotelContact (hotelID);

create index booking_room on Room (hotelID, roomNo, capacity, pricePerDay);
create index booking_booking on Booking (roomNo, hotelID, startDate, endDate);



