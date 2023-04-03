import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import 'reactjs-popup/dist/index.css';
import CustomPopup from "./CustomPopup";
import TextField from '@mui/material/TextField'


function RegisterForm({ onClose }) {
    return (
        <div className="popup-container">
            <h2 align={'center'}>First Booking? Register</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                            noValidate
                            autoComplete="off">
                            <TextField id="first-name" label="First Name" variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                            noValidate
                            autoComplete="off">
                            <TextField id="last-name" label="Last Name" variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                            noValidate
                            autoComplete="off">
                            <TextField id="ssn-register" label="SSN" variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                            noValidate
                            autoComplete="off">
                            <TextField id="address-city" label="City (Address)" variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                            noValidate
                            autoComplete="off">
                            <TextField id="address-state-province" label="State or Province (Address)" variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                            noValidate
                            autoComplete="off">
                            <TextField id="address-country" label="Country (Address)" variant="outlined" />
                        </Box>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}}>Submit</Button>
            </Box>
            <hr/>
            <h2 align={'center'}>Already been here? Login</h2>
            <Box sx={{ width: '100%' }}>
                <Grid item xs={6}>
                    <Box
                        component="form"
                        sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                        noValidate
                        autoComplete="off">
                        <TextField id="ssn-login" label="SSN" variant="outlined" />
                    </Box>
                </Grid>
            </Box>
            <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}}>Log in</Button>
        </div>
    );
}
export default function ResultsGrid() {
    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };    

    // Ex default values for rooms route: 

    const [rooms, setRooms] = useState([]);
    const getRooms = async () => {
        try {
          const response = await fetch("http://localhost:3001/hotelChains/Le Ritz/hotels/Canada/3/5/rooms/4/400/dates/2021-10-30/2021-10-31");
          const jsonData = await response.json();
    
          setRooms(jsonData);
        } catch (err) {
          console.error(err.message);
        }
    };

    React.useEffect(() => {
        getRooms();
      }, []);

    const roomViewMap = new Map()
    roomViewMap.set('Mountain View', './MountainView.jpg')
    roomViewMap.set('Sea View', './BeachView.png')
    
    // console.log(rooms);

    rooms.forEach(room => {
        Object.keys(room).forEach((i) => {
            if (room[i] == null) {
                room[i] = "None"
            }
        });
    })

    const groupRoomsByHotel = rooms.reduce((hotelNameAccumulator, room) => {
        const { hotelname, chainname, street, city, stateorprovince, country } = room;
        if (!hotelNameAccumulator[hotelname]) {
            hotelNameAccumulator[hotelname] = {
                address: street+", "+city+", "+stateorprovince+", "+country,
                chainname: chainname,
                contactinfo: [],
                rooms: []
            }
        }
        // Push onto rooms and contactinfo array, will later iterator over for each
        hotelNameAccumulator[hotelname].rooms.push(room);
        hotelNameAccumulator[hotelname].contactinfo.push(room.contactinfo);
        return hotelNameAccumulator;
      }, {});
    // console.log(groupRoomsByHotel)

    const roomsByHotel = Object.entries(groupRoomsByHotel)
    .map(([hotelname, {chainname, address, contactinfo, rooms}]) => ({
        hotelname,
        chainname,
        address,
        contactinfo,
        rooms
      }));
    // console.log(roomsByHotel)

    return (
        <>
        {roomsByHotel.map(({ hotelname, chainname, address, contactinfo, rooms }) => (
            <Box key={hotelname+"B"} sx={{ width: '100%', mt: 30, ml:2, mr:2, maxWidth:1500}}>
                <Typography key={hotelname+"T1"} variant="h5" component="div">
                    {hotelname+" | "+chainname}
                    <Typography key={hotelname+"T2"} variant="subtitle1" component="div">
                        {address}
                    </Typography>
                    {/* Want contacts to be unique */}
                    {[...new Set(contactinfo)].map(info => (
                        <Typography key={hotelname+info+"T"} gutterBottom variant="subtitle1" component="div">
                        {info}
                        </Typography>
                    ))}
                </Typography>                
                <Grid key={hotelname+"G"}  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="row">
                    {rooms.map(room => (
                        <Grid key={hotelname+""+room.roomno+"G"} item xs={3} sm={6} md={4} lg={3}>
                            <Card key={hotelname+""+room.roomno+"C"} sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={roomViewMap.get(room.roomview)}
                                    title="view picture"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {"Room " + room.roomno}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {room.roomview} <br></br>
                                        {"Amenities: " + room.amenity} <br></br>
                                        {"Capacity: "+room.capacity+" people"}
                                        {room.extendable ? ", (Extendable)" : ", (Not Extendable)"}<br></br>
                                        {"Price per night: $" + room.priceperday} <br></br>
                                        {"Damages: " + room.details}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={(e) => setVisibility(!visibility)}>Book this room</Button>
                                    <CustomPopup
                                        title="BookingPopup"
                                        onClose={popupCloseHandler}
                                        show={visibility}
                                    >
                                        <RegisterForm/>
                                    </CustomPopup>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ))}
        </>
    );
}

