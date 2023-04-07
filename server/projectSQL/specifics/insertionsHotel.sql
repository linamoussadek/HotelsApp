-- Second set of insertions to set up DB with sample values

-- Hotel chains: 5
insert into HotelChain (chainName, addressID) values 
    ('Le Ritz', 1),
    ('La Fleur', 2),
    ('The Lazy Potato', 3),
    ('Chateau Lina', 4),
    ('The Michael Zone', 5);

-- Hotels: 8 for each chain, 5 chains -> 40 hotels
insert into Hotel (chainID, hotelName, addressID, managerID, rating) values 
    (1, 'Le Ritz Downtown', 7, 1, 5),
    (2, 'The Golden Star', 8, 2, 3),
    (3, 'The Sapphire Skyline', 9, 3, 5),
    (4, 'The Ocean View', 10, 4, 2),
    (5, 'The Alpine Lodge', 11, 5, 4),
    (1, 'The Mystic Mirage', 12, 6, 3),
    (2, 'The Crimson Palace', 13, 7, 4),
    (3, 'The Paradise Island', 14, 8, 2),
    (4, 'The Silver Crest', 15, 9, 5),
    (5, 'The Royal Retreat', 16, 10, 3),
    (1, 'The Emerald Enclave', 17, 11, 4),
    (2, 'The Obsidian Tower', 18, 12, 2),
    (3, 'The Azure Horizon', 19, 13, 5),
    (4, 'The Jade Garden', 20, 14, 3),
    (5, 'The Serene Bay', 21, 15, 4),
    (1, 'The Mystic Woods', 22, 16, 2),
    (2, 'The Diamond Hill', 23, 17, 4),
    (3, 'The Rustic Retreat', 24, 18, 3),
    (4, 'The Moonlit Bay', 25, 19, 5),
    (5, 'The Forest Haven', 26, 20, 2),
    (1, 'The Golden Sands', 27, 21, 4),
    (2, 'The Sapphire Shores', 28, 22, 3),
    (3, 'The Arctic Oasis', 29, 23, 5),
    (4, 'The Emerald Forest', 30, 24, 2),
    (5, 'The Desert Mirage', 31, 25, 4),
    (1, 'The Enchanted Garden', 32, 26, 3),
    (2, 'The Celestial Palace', 33, 27, 2),
    (3, 'The Radiant Sunflower', 34, 28, 5),
    (4, 'The Rustic Cabin', 35, 29, 3),
    (5, 'The Secluded Meadow', 36, 30, 4),
    (1, 'The Lavender Hill', 37, 31, 2),
    (2, 'The Twilight Skyline', 38, 32, 4),
    (3, 'The Silver Skies', 39, 33, 3),
    (4, 'The Luminous Lagoon', 40, 34, 5),
    (5, 'The Starry Nights', 41, 35, 2),
    (1, 'The Blue Apple', 42, 36, 1),
    (2, 'Lina Lagoon', 43, 37, 5),
    (3, 'Michael Mansion', 44, 38, 5),
    (4, 'Luigis Playpen', 45, 39, 1),
    (5, 'Banana Hotel', 46, 40, 1);

insert into HotelContact (hotelID, contactInfo) values
    (1, 'LeRitzDowntown@example.com'),
    (2, '555-123-1234'),
    (3, '556-123-1234'),
    (4, '557-123-1234'),
    (5, '558-123-1234'),
    (6, '559-123-1234'),
    (7, '560-123-1234'),
    (8, '561-123-1234'),
    (9, '562-123-1234'),
    (10, '563-123-1234'),
    (11, '564-123-1234'),
    (12, '565-123-1234'),
    (13, '566-123-1234'),
    (14, '567-123-1234'),
    (15, '568-123-1234'),
    (16, '569-123-1234'),
    (17, '570-123-1234'),
    (18, '510-123-1234'),
    (19, '123-123-1234'),
    (20, '431-123-1234'),
    (21, 'TheGoldenSands@example.com'),
    (22, 'TheSapphireShores@example.com'),
    (23, 'TheArcticOasis@example.com'),
    (24, 'TheEmeraldForest@example.com'),
    (25, 'TheDesertMirage@example.com'),
    (26, 'TheEnchantedGarden@example.com'),
    (27, 'TheCelestialPalace@example.com'),
    (28, 'TheRadiantSunflo@example.comwer'),
    (29, 'TheRusticCabin@example.com'),
    (30, 'TheSecludedMeadow@example.com'),
    (31, 'TheLavenderHill@example.com' ),
    (32, 'TheTwilightSkyline@example.com'),
    (33, 'TheSilverSkies@example.com'),
    (34, 'TheLuminousLagoon@example.com'),
    (35, 'TheStarryNights@example.com'),
    (36, 'TheBlueApple@example.com'),
    (37, 'LinaLagoon@example.com'),
    (38, 'MichaelMansion@example.com'),
    (39, 'LuigisPlaypen@example.com'),
    (40, 'BananaHotel@example.com');

-- Note: hotel managers(1-40) are already inserted via trigger
insert into WorksAt (employeeID, hotelID) values
    (41, 1),
    (42, 2),
    (43, 3),
    (44, 4),
    (45, 5),
    (46, 6),
    (47, 7),
    (48, 8),
    (49, 9),
    (50, 10),
    (51, 11),
    (52, 12),
    (53, 13),
    (54, 14),
    (55, 15),
    (56, 16),
    (57, 17),
    (58, 18),
    (59, 19),
    (60, 20),
    (61, 21),
    (62, 22),
    (63, 23),
    (64, 24),
    (65, 25),
    (66, 26),
    (67, 27),
    (68, 28),
    (69, 29),
    (70, 30),
    (71, 31),
    (72, 32),
    (73, 33),
    (74, 34),
    (75, 35),
    (76, 36),
    (77, 37),
    (78, 38),
    (79, 39),
    (80, 40);

-- Rooms: 5 for each hotel, 40 hotels -> 200 rooms
insert into Room (roomNo, hotelID, pricePerDay, capacity, roomView, extendable) values 
    (1, 1, 350.5, 2, 'Mountain View', true),
    (2, 1, 275.0, 3, 'Sea View', false),
    (3, 1, 300.0, 4, 'Mountain View', true),
    (4, 1, 250.0, 5, 'Sea View', false),
    (5, 1, 400.0, 6, 'Mountain View', true),
    (1, 2, 300.0, 3, 'Sea View', false),
    (2, 2, 375.0, 4, 'Mountain View', true),
    (3, 2, 325.0, 5, 'Sea View', false),
    (4, 2, 350.0, 2, 'Mountain View', true),
    (5, 2, 275.5, 6, 'Sea View', false),
    (1, 3, 250.0, 4, 'Mountain View', true),
    (2, 3, 225.0, 5, 'Sea View', false),
    (3, 3, 400.0, 6, 'Mountain View', true),
    (4, 3, 300.0, 3, 'Sea View', false),
    (5, 3, 350.0, 2, 'Mountain View', true),
    (1, 4, 275.0, 5, 'Sea View', false),
    (2, 4, 400.0, 6, 'Mountain View', true),
    (3, 4, 350.5, 2, 'Sea View', false),
    (4, 4, 300.0, 3, 'Mountain View', true),
    (5, 4, 325.0, 4, 'Sea View', false),
    (1, 5, 300.0, 2, 'Mountain View', true),
    (2, 5, 250.0, 3, 'Sea View', false),
    (3, 5, 200.0, 4, 'Mountain View', false),
    (4, 5, 350.0, 5, 'Sea View', true),
    (5, 5, 400.0, 6, 'Mountain View', true),
    (1, 6, 200.0, 3, 'Sea View', false),
    (2, 6, 300.0, 2, 'Mountain View', true),
    (3, 6, 350.0, 4, 'Sea View', true),
    (4, 6, 400.0, 6, 'Mountain View', false),
    (5, 6, 250.0, 5, 'Sea View', true),
    (1, 7, 400.0, 4, 'Mountain View', true),
    (2, 7, 300.0, 3, 'Sea View', false),
    (3, 7, 200.0, 2, 'Mountain View', true),
    (4, 7, 250.0, 5, 'Sea View', false),
    (5, 7, 350.0, 6, 'Mountain View', true),
    (1, 8, 250.0, 5, 'Sea View', false),
    (2, 8, 400.0, 6, 'Mountain View', true),
    (3, 8, 300.0, 2, 'Sea View', true),
    (4, 8, 200.0, 3, 'Mountain View', false),
    (5, 8, 350.0, 4, 'Sea View', true),
    (1, 9, 200.0, 2, 'Mountain View', true),
    (2, 9, 250.0, 3, 'Mountain View', true),
    (3, 9, 350.0, 4, 'Sea View', true),
    (4, 9, 400.0, 5, 'Sea View', true),
    (5, 9, 300.0, 6, 'Mountain View', false),
    (1, 10, 250.0, 3, 'Mountain View', true),
    (2, 10, 300.0, 4, 'Sea View', true),
    (3, 10, 400.0, 5, 'Mountain View', false),
    (4, 10, 200.0, 2, 'Sea View', true),
    (5, 10, 350.0, 6, 'Sea View', false),
    (1, 11, 300.0, 4, 'Sea View', true),
    (2, 11, 400.0, 5, 'Mountain View', false),
    (3, 11, 200.0, 2, 'Mountain View', true),
    (4, 11, 350.0, 6, 'Sea View', false),
    (5, 11, 250.0, 3, 'Mountain View', true),
    (1, 12, 400.0, 5, 'Sea View', false),
    (2, 12, 200.0, 2, 'Mountain View', true),
    (3, 12, 350.0, 6, 'Sea View', false),
    (4, 12, 250.0, 3, 'Mountain View', true),
    (5, 12, 300.0, 4, 'Sea View', true),
    (1, 13, 200.0, 2, 'Mountain View', true),
    (2, 13, 250.0, 3, 'Sea View', false),
    (3, 13, 175.0, 4, 'Mountain View', false),
    (4, 13, 375.0, 5, 'Sea View', true),
    (5, 13, 300.0, 6, 'Mountain View', true),
    (1, 14, 225.0, 2, 'Sea View', false),
    (2, 14, 275.0, 3, 'Mountain View', false),
    (3, 14, 400.0, 4, 'Sea View', true),
    (4, 14, 350.0, 5, 'Mountain View', true),
    (5, 14, 200.0, 6, 'Sea View', false),
    (1, 15, 300.0, 2, 'Mountain View', true),
    (2, 15, 375.0, 3, 'Sea View', false),
    (3, 15, 200.0, 4, 'Mountain View', false),
    (4, 15, 250.0, 5, 'Sea View', true),
    (5, 15, 175.0, 6, 'Mountain View', true),
    (1, 16, 350.0, 2, 'Sea View', false),
    (2, 16, 200.0, 3, 'Mountain View', false),
    (3, 16, 225.0, 4, 'Sea View', true),
    (4, 16, 300.0, 5, 'Mountain View', true),
    (5, 16, 400.0, 6, 'Sea View', false),
    (1, 17, 200.0, 2, 'Mountain View', true),
    (2, 17, 250.0, 3, 'Sea View', false),
    (3, 17, 175.0, 4, 'Mountain View', false),
    (4, 17, 375.0, 5, 'Sea View', true),
    (5, 17, 300.0, 6, 'Mountain View', true),
    (1, 18, 225.0, 2, 'Sea View', false),
    (2, 18, 275.0, 3, 'Mountain View', false),
    (3, 18, 400.0, 4, 'Sea View', true),
    (4, 18, 350.0, 5, 'Mountain View', true),
    (5, 18, 200.0, 6, 'Sea View', false),
    (1, 19, 300.0, 2, 'Mountain View', true),
    (2, 19, 375.0, 3, 'Sea View', false),
    (3, 19, 200.0, 4, 'Mountain View', false),
    (4, 19, 250.0, 5, 'Sea View', true),
    (5, 19, 175.0, 6, 'Mountain View', true),
    (1, 20, 350.0, 2, 'Sea View', false),
    (2, 20, 200.0, 3, 'Mountain View', false),
    (3, 20, 225.0, 4, 'Sea View', true),
    (4, 20, 300.0, 5, 'Mountain View', true),
    (5, 20, 400.0, 6, 'Sea View', false),
    (1, 21, 350.5, 2, 'Mountain View', true),
    (2, 21, 275.0, 3, 'Sea View', false),
    (3, 21, 300.0, 4, 'Mountain View', true),
    (4, 21, 250.0, 5, 'Sea View', false),
    (5, 21, 400.0, 6, 'Mountain View', true),
    (1, 22, 300.0, 3, 'Sea View', false),
    (2, 22, 375.0, 4, 'Mountain View', true),
    (3, 22, 325.0, 5, 'Sea View', false),
    (4, 22, 350.0, 2, 'Mountain View', true),
    (5, 22, 275.5, 6, 'Sea View', false),
    (1, 23, 250.0, 4, 'Mountain View', true),
    (2, 23, 225.0, 5, 'Sea View', false),
    (3, 23, 400.0, 6, 'Mountain View', true),
    (4, 23, 300.0, 3, 'Sea View', false),
    (5, 23, 350.0, 2, 'Mountain View', true),
    (1, 24, 275.0, 5, 'Sea View', false),
    (2, 24, 400.0, 6, 'Mountain View', true),
    (3, 24, 350.5, 2, 'Sea View', false),
    (4, 24, 300.0, 3, 'Mountain View', true),
    (5, 24, 325.0, 4, 'Sea View', false),
    (1, 25, 300.0, 2, 'Mountain View', true),
    (2, 25, 250.0, 3, 'Sea View', false),
    (3, 25, 200.0, 4, 'Mountain View', false),
    (4, 25, 350.0, 5, 'Sea View', true),
    (5, 25, 400.0, 6, 'Mountain View', true),
    (1, 26, 200.0, 3, 'Sea View', false),
    (2, 26, 300.0, 2, 'Mountain View', true),
    (3, 26, 350.0, 4, 'Sea View', true),
    (4, 26, 400.0, 6, 'Mountain View', false),
    (5, 26, 250.0, 5, 'Sea View', true),
    (1, 27, 400.0, 4, 'Mountain View', true),
    (2, 27, 300.0, 3, 'Sea View', false),
    (3, 27, 200.0, 2, 'Mountain View', true),
    (4, 27, 250.0, 5, 'Sea View', false),
    (5, 27, 350.0, 6, 'Mountain View', true),
    (1, 28, 250.0, 5, 'Sea View', false),
    (2, 28, 400.0, 6, 'Mountain View', true),
    (3, 28, 300.0, 2, 'Sea View', true),
    (4, 28, 200.0, 3, 'Mountain View', false),
    (5, 28, 350.0, 4, 'Sea View', true),
    (1, 29, 200.0, 2, 'Mountain View', true),
    (2, 29, 250.0, 3, 'Mountain View', true),
    (3, 29, 350.0, 4, 'Sea View', true),
    (4, 29, 400.0, 5, 'Sea View', true),
    (5, 29, 300.0, 6, 'Mountain View', false),
    (1, 30, 250.0, 3, 'Mountain View', true),
    (2, 30, 300.0, 4, 'Sea View', true),
    (3, 30, 400.0, 5, 'Mountain View', false),
    (4, 30, 200.0, 2, 'Sea View', true),
    (5, 30, 350.0, 6, 'Sea View', false),
    (1, 31, 300.0, 4, 'Sea View', true),
    (2, 31, 400.0, 5, 'Mountain View', false),
    (3, 31, 200.0, 2, 'Mountain View', true),
    (4, 31, 350.0, 6, 'Sea View', false),
    (5, 31, 250.0, 3, 'Mountain View', true),
    (1, 32, 400.0, 5, 'Sea View', false),
    (2, 32, 200.0, 2, 'Mountain View', true),
    (3, 32, 350.0, 6, 'Sea View', false),
    (4, 32, 250.0, 3, 'Mountain View', true),
    (5, 32, 300.0, 4, 'Sea View', true),
    (1, 33, 200.0, 2, 'Mountain View', true),
    (2, 33, 250.0, 3, 'Sea View', false),
    (3, 33, 175.0, 4, 'Mountain View', false),
    (4, 33, 375.0, 5, 'Sea View', true),
    (5, 33, 300.0, 6, 'Mountain View', true),
    (1, 34, 225.0, 2, 'Sea View', false),
    (2, 34, 275.0, 3, 'Mountain View', false),
    (3, 34, 400.0, 4, 'Sea View', true),
    (4, 34, 350.0, 5, 'Mountain View', true),
    (5, 34, 200.0, 6, 'Sea View', false),
    (1, 35, 300.0, 2, 'Mountain View', true),
    (2, 35, 375.0, 3, 'Sea View', false),
    (3, 35, 200.0, 4, 'Mountain View', false),
    (4, 35, 250.0, 5, 'Sea View', true),
    (5, 35, 175.0, 6, 'Mountain View', true),
    (1, 36, 350.0, 2, 'Sea View', false),
    (2, 36, 200.0, 3, 'Mountain View', false),
    (3, 36, 225.0, 4, 'Sea View', true),
    (4, 36, 300.0, 5, 'Mountain View', true),
    (5, 36, 400.0, 6, 'Sea View', false),
    (1, 37, 200.0, 2, 'Mountain View', true),
    (2, 37, 250.0, 3, 'Sea View', false),
    (3, 37, 175.0, 4, 'Mountain View', false),
    (4, 37, 375.0, 5, 'Sea View', true),
    (5, 37, 300.0, 6, 'Mountain View', true),
    (1, 38, 225.0, 2, 'Sea View', false),
    (2, 38, 275.0, 3, 'Mountain View', false),
    (3, 38, 400.0, 4, 'Sea View', true),
    (4, 38, 350.0, 5, 'Mountain View', true),
    (5, 38, 200.0, 6, 'Sea View', false),
    (1, 39, 300.0, 2, 'Mountain View', true),
    (2, 39, 375.0, 3, 'Sea View', false),
    (3, 39, 200.0, 4, 'Mountain View', false),
    (4, 39, 250.0, 5, 'Sea View', true),
    (5, 39, 175.0, 6, 'Mountain View', true),
    (1, 40, 350.0, 2, 'Sea View', false),
    (2, 40, 200.0, 3, 'Mountain View', false),
    (3, 40, 225.0, 4, 'Sea View', true),
    (4, 40, 300.0, 5, 'Mountain View', true),
    (5, 40, 400.0, 6, 'Sea View', false);

-- Amenities for each room
insert into Amenity (roomNo, hotelID, amenity) values
    (2, 1, 'TV'),
    (2, 2, 'Fridge'),
    (2, 3, 'Air Conditioning'),
    (2, 4, 'Personal Safe'),
    (2, 5, 'Coffee'),
    (2, 6, 'TV'),
    (2, 7, 'Fridge'),
    (2, 8, 'Air Conditioning'),
    (2, 9, 'Personal Safe'),
    (2, 10, 'Coffee'),
    (2, 11, 'TV'),
    (2, 12, 'Fridge'),
    (2, 13, 'Air Conditioning'),
    (2, 14, 'Personal Safe'),
    (2, 15, 'Coffee'),
    (2, 16, 'TV'),
    (2, 17, 'Fridge'),
    (2, 18, 'Air Conditioning'),
    (2, 19, 'Personal Safe'),
    (2, 20, 'Coffee'),
    (2, 21, 'TV'),
    (2, 22, 'Fridge'),
    (2, 23, 'Air Conditioning'),
    (2, 24, 'Personal Safe'),
    (2, 25, 'Coffee'),
    (2, 26, 'TV'),
    (2, 27, 'Fridge'),
    (2, 28, 'Air Conditioning'),
    (2, 29, 'Personal Safe'),
    (2, 30, 'Coffee'),
    (2, 31, 'TV'),
    (2, 32, 'Fridge'),
    (2, 33, 'Air Conditioning'),
    (2, 34, 'Personal Safe'),
    (2, 35, 'Coffee'),
    (2, 36, 'TV'),
    (2, 37, 'Fridge'),
    (2, 38, 'Air Conditioning'),
    (2, 39, 'Personal Safe'),
    (2, 40, 'Coffee'),
    (3, 1, 'Fridge'),
    (3, 2, 'TV'),
    (3, 3, 'Personal Safe'),
    (3, 4, 'Personal Safe'),
    (3, 5, 'TV'),
    (3, 6, 'Fridge'),
    (3, 7, 'TV'),
    (3, 8, 'Coffee'),
    (3, 9, 'TV'),
    (3, 10, 'Coffee'),
    (3, 11, 'TV'),
    (3, 12, 'Fridge'),
    (3, 13, 'Air Conditioning'),
    (3, 14, 'TV'),
    (3, 15, 'Coffee'),
    (3, 16, 'TV'),
    (3, 17, 'Fridge'),
    (3, 18, 'Air Conditioning'),
    (3, 19, 'Coffee'),
    (3, 20, 'Air Conditioning'),
    (3, 21, 'Air Conditioning'),
    (3, 22, 'Fridge'),
    (3, 23, 'Air Conditioning'),
    (3, 24, 'TV'),
    (3, 25, 'Air Conditioning'),
    (3, 26, 'Air Conditioning'),
    (3, 27, 'Fridge'),
    (3, 28, 'Air Conditioning'),
    (3, 29, 'Air Conditioning'),
    (3, 30, 'Personal Safe'),
    (3, 31, 'Personal Safe'),
    (3, 32, 'Fridge'),
    (3, 33, 'Air Conditioning'),
    (3, 34, 'Personal Safe'),
    (3, 35, 'Personal Safe'),
    (3, 36, 'Coffee'),
    (3, 37, 'Fridge'),
    (3, 38, 'Air Conditioning'),
    (3, 39, 'Coffee'),
    (3, 40, 'Coffee');
    

-- Damages for each room
insert into Damage (roomNo, hotelID, details) values
    (1, 1, 'Cracked window'),
    (1, 2, 'Scratched wall'),
    (1, 3, 'Stained carpet'),
    (1, 4, 'Torn bedsheet'),
    (1, 5, 'Broken lamp'),
    (1, 6, 'Missing remote control'),
    (1, 7, 'Clogged drain'),
    (1, 8, 'Damaged curtains'),
    (1, 9, 'Worn-out mattress'),
    (1, 10, 'Flickering light'),
    (1, 11, 'Loose doorknob'),
    (1, 12, 'Cracked tile'),
    (1, 13, 'Leaky faucet'),
    (1, 14, 'Squeaky chair'),
    (1, 15, 'Frayed towels'),
    (1, 16, 'Sticky doorknob'),
    (1, 17, 'Loose tile'),
    (1, 18, 'Chipped paint'),
    (1, 19, 'Scratched table'),
    (1, 20, 'Burnt-out light'),
    (1, 21, 'Torn wallpaper'),
    (1, 22, 'Malfunctioning TV'),
    (1, 23, 'Rusty showerhead'),
    (1, 24, 'Stained bedspread'),
    (1, 25, 'Wobbly table'),
    (1, 26, 'Chipped glass'),
    (1, 27, 'Leaky shower'),
    (1, 28, 'Missing hangers'),
    (1, 29, 'Dirty mirror'),
    (1, 30, 'Creaky floor'),
    (1, 31, 'Worn-out sofa'),
    (1, 32, 'Noisy air conditioner'),
    (1, 33, 'Stained curtains'),
    (1, 34, 'Cracked mirror'),
    (1, 35, 'Frayed carpet'),
    (1, 36, 'Chipped furniture'),
    (1, 37, 'Dusty lampshade'),
    (1, 38, 'Worn-out pillows'),
    (1, 39, 'Scratched nightstand'),
    (1, 40, 'Peeling wallpaper');

-- Bookings
insert into Booking (customerID, roomNo, hotelID, employeeID, 
    startDate, endDate, canceled, checkedIn) values
    (2, 1, 1, null, current_date, current_date, false, false),
    (2, 2, 1, null, current_date, current_date + interval '10 days', false, false),
    (2, 3, 1, null, current_date, current_date + interval '15 days', false, false),
    (2, 4, 1, null, current_date, current_date + interval '20 days', false, false),
    (2, 5, 1, null, current_date, current_date + interval '25 days', false, false);