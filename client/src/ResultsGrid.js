import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import 'reactjs-popup/dist/index.css';
import CustomPopup from "./CustomPopup";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HomeImage from "./HomeImage";
import SearchBox from "./SearchBox";


function NoRoomsSnackbar({text}) {
    const [open, setOpen] = React.useState(true);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  
    return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={text}
          action={action}
        />
      </div>
    );
  }

export default function ResultsGrid() {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRooms = async (hotelchain, country, hotelsize, rating, roomcapacity, priceperday, startdate, enddate) => {
        try {
            const endpoint = `http://localhost:3001/hotelChains/${hotelchain}/hotels/${country}/${hotelsize}/${rating}/rooms/${roomcapacity}/${priceperday}/dates/${startdate}/${enddate}`
            const response = await fetch(endpoint);
            const jsonData = await response.json();    
            setRooms(jsonData);
            setIsLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    };

     const updateRooms = () => {
        const hotelChain = window.localStorage.getItem('hotelchain') || null;
        const country = window.localStorage.getItem('country') || null;
        const hotelSize = window.localStorage.getItem('hotelsize') || null;
        const rating = window.localStorage.getItem('rating') || null;
        const roomCapacity = window.localStorage.getItem('roomcapacity') || null;
        const pricePerDay = window.localStorage.getItem('priceperday') || null;
        const startDate = window.localStorage.getItem('startdate') === 
            '1969-12-31' ? null : window.localStorage.getItem('startdate');
        const endDate = window.localStorage.getItem('enddate') === 
            '1969-12-31' ? null : window.localStorage.getItem('enddate');
        getRooms(hotelChain, country, hotelSize, rating, roomCapacity, pricePerDay, startDate, endDate);
    };

    // Get criteria values for rooms route from localstorage
    React.useEffect(() => {
        updateRooms();
    }, []);

    const [refresh, setRefresh] = React.useState(false);
    const refreshResults = () => {
      updateRooms()
      setRefresh(r => !r);
      console.log(rooms)
    }
    

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
    if(isLoading) return <NoRoomsSnackbar text = "Loading..."></NoRoomsSnackbar>
    if(roomsByHotel.length === 0) return <NoRoomsSnackbar text = "No rooms found"></NoRoomsSnackbar>

    return (
        <>
        <div className="container">
            <div className="home-image">
                <HomeImage />
            </div>
            <div className="search-box">
                <SearchBox id={refresh} refresh={refreshResults}/>
            </div>
        </div>
        <Box sx={{ width: '100%', mt: 15, ml:2, mr:2, maxWidth:1500}}></Box>
        {roomsByHotel.map(({ hotelname, chainname, address, contactinfo, rooms }) => (
            <Box key={hotelname+"B"} sx={{ width: '100%', mt: 10, ml:2, mr:2, maxWidth:1500}}>
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
                                    <CustomPopup
                                        room = {room}
                                    >
                                    </CustomPopup>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ))}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          {rooms.length === 50 && <Typography color='grey' variant="body1">--- Showing the first 50 rooms ---</Typography>}
          {rooms.length < 50 && <Typography color='grey' variant="body1">--- Showing all available rooms ---</Typography>}
        </div>        
        </>
    );
}

