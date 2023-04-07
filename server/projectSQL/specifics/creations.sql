create table Address(
    addressID int GENERATED ALWAYS AS IDENTITY,
    street varchar(60) not null,
    city varchar(60) not null,
    stateOrProvince varchar(60) not null,
    country varchar(60) not null,
    primary key(addressID)
);

create table HotelChain(
    chainID int GENERATED ALWAYS AS IDENTITY,
    chainName varchar(60) not null unique,
    addressID int not null,
    foreign key (addressID) references Address,
    primary key(chainID)
);

create table ChainContact(
    chainID int,
    contactInfo varchar(60),
    foreign key (chainID) references HotelChain,
    primary key (chainID, contactInfo)
);

create table Person(
    ssn varchar(60),
    addressID int not null,
    firstName varchar(60) not null,
    lastName varchar(60) not null,
    check (length(ssn) = 9),
    foreign key (addressID) references Address,
    primary key(ssn)
);

create table Customer(
    customerID int GENERATED ALWAYS AS IDENTITY,
    ssn varchar(60) not null unique,
    registrationDate Date not null,
    foreign key (ssn) references Person on delete cascade,
    primary key (customerID)
);

create table Employee(
    employeeID int GENERATED ALWAYS AS IDENTITY,
    ssn varchar(60) not null unique,
    yearlySalary int not null,
    check (yearlySalary >= 0),
    foreign key (ssn) references Person on delete cascade,
    primary key (employeeID)
);

create type positionEnum as enum ('Manager', 'Reception Staff', 'Cleaning Staff', 'Kitchen Staff', 'IT Staff');
create table EmployeePosition(
    employeeID int,
    positionName positionEnum,
    foreign key (employeeID) references Employee on delete cascade,
    primary key (employeeID, positionName)
);

create table Hotel(
    hotelID int GENERATED ALWAYS AS IDENTITY,
    chainID int not null,
    hotelName varchar not null unique,
    addressID int not null,
    managerID int not null,
    rating int not null,
    check (rating > 0 AND rating < 6),
    foreign key (chainID) references HotelChain on delete cascade,
    foreign key (addressID) references Address,
    foreign key (managerID) references Employee,
    primary key (hotelID)
);

create table WorksAt(
    employeeID int,
    hotelID int,
    foreign key (employeeID) references Employee on delete cascade,
    foreign key (hotelID) references Hotel on delete cascade,
    primary key (employeeID, hotelID)
);

create table HotelContact(
    hotelID int,
    contactInfo varchar(60),
    foreign key (hotelID) references Hotel,
    primary key (hotelID, contactInfo)
);

create type roomViewEnum as enum ('Mountain View', 'Sea View');
create table Room(
    roomNo int,
    hotelID int,
    pricePerDay float not null,
    capacity int not null,
    roomView roomViewEnum not null,
    extendable boolean not null,
    check (roomNo >= 0),
    check (pricePerDay >= 0),
    check (capacity > 0 AND capacity < 7),
    foreign key(hotelID) references Hotel on delete cascade,
    primary key (roomNo, hotelID)
);

create table Damage(
    roomNo int,
    hotelID int,
    details varchar(100),
    foreign key (roomNo, hotelID) references Room on update cascade on delete cascade,
    primary key (roomNo, hotelID, details)
);

create type amenityEnum as enum ('TV', 'Air Conditioning', 'Fridge', 'Personal Safe', 'Coffee');
create table Amenity(
    roomNo int,
    hotelID int,
    amenity amenityEnum,
    foreign key (roomNo, hotelID) references Room on update cascade on delete cascade,
    primary key (roomNo, hotelID, amenity)
);

create table Booking(
    bookingID int GENERATED ALWAYS AS IDENTITY,
    customerID int,
    roomNo int,
    hotelID int,
    employeeID int,
    startDate Date not null,
    endDate Date not null,
    canceled boolean not null,
    checkedIn boolean not null,
    constraint employee_check_in check(
        employeeID is null and (checkedIn = false and canceled = false) or 
        employeeID is not null and (checkedIn = true or canceled = true)
    ),
    constraint maximum_booking_time check(
        extract(day from startDate::timestamp - endDate::timestamp) < 31 AND
        endDate >= startDate
    ),
    foreign key (customerID) references Customer on delete set null,
    foreign key (roomNo, hotelID) references Room on delete set null,
    foreign key (employeeID) references Employee on delete set null,
    primary key (bookingID)
);