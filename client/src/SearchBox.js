import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Input = styled(MuiInput)`
  width: 42px;
`;



function BasicSelectHotelChain() {
    const [hotelChain, setHotelChain] = React.useState('');

    const handleChange = (event) => {
        setHotelChain(event.target.value);
        window.localStorage.setItem('hotelchain', event.target.value);
    };

    const [hotelChains, setHotelChains] = React.useState([]);
    const getHotelChains = async () => {
        try {
            const response = await fetch("http://localhost:3001/hotelChains");
            const jsonData = await response.json();
            
            setHotelChains(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        getHotelChains();
      }, []);
    // console.log(hotelChains)

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Hotel Chain</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hotelChain}
                    label="Hotel Chain"
                    onChange={handleChange}
                >
                    {hotelChains.map(chain => (
                        <MenuItem key={chain.chainname} value={chain.chainname}>{chain.chainname}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function BasicSelectCountry() {
    const [country, setCountry] = React.useState('');

    const handleChange = (event) => {
        setCountry(event.target.value);
        window.localStorage.setItem('country', event.target.value);
    };

    const [countries, setCountries] = React.useState([]);
    const getCountries = async () => {
        try {
            const response = await fetch("http://localhost:3001/countryCapacities");
            const jsonData = await response.json();
            
            setCountries(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        getCountries();
      }, []);
    // console.log(countries)

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country}
                    label="Country"
                    onChange={handleChange}
                >
                    {countries.map(country => (
                        <MenuItem key={country.country} value={country.country}>
                            {country.country+": "+country.sum+" rooms"}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function BasicSelectNoOfStars() {
    const [noOfStars, setnoOfStars] = React.useState('');

    const handleChange = (event) => {
        setnoOfStars(event.target.value);
        window.localStorage.setItem('rating', event.target.value);
    };

    const [hotelRatings, sethotelRatings] = React.useState([]);
    const gethotelRatings = async () => {
        try {
            const response = await fetch("http://localhost:3001/hotelRatings");
            const jsonData = await response.json();
            
            sethotelRatings(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        gethotelRatings();
      }, []);
    // console.log(hotelRatings)

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Star Rating</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={noOfStars}
                    label="noOfStars"
                    onChange={handleChange}
                >
                    {hotelRatings.map(hotelRating => (
                        <MenuItem key={hotelRating.rating} value={hotelRating.rating}>{hotelRating.rating}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function BasicSelectRoomCapacity() {
    const [roomCapacity, setRoomCapacity] = React.useState('');

    const handleChange = (event) => {
        setRoomCapacity(event.target.value);
        window.localStorage.setItem('roomcapacity', event.target.value);
    };

    const [roomCapacities, setRoomCapacities] = React.useState([]);
    const getroomCapacities = async () => {
        try {
            const response = await fetch("http://localhost:3001/roomCapacities");
            const jsonData = await response.json();
            
            setRoomCapacities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        getroomCapacities();
      }, []);
    // console.log(roomCapacities)

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Room Capacity</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomCapacity}
                    label="Room Capacity"
                    onChange={handleChange}
                >
                    {roomCapacities.map(roomCapacity => (
                        <MenuItem key={roomCapacity.capacity} value={roomCapacity.capacity}>{roomCapacity.capacity}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}



function BasicDateRangePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

function BasicSelectHotelSize() {
    const [hotelSize, setHotelCapacity] = React.useState('');

    const handleChange = (event) => {
        setHotelCapacity(event.target.value);
        window.localStorage.setItem('hotelsize', event.target.value);
        localStorage["bar"] = "Aaaaaasdfkjnsadfkjnsaf";
    };

    const [hotelCapacities, setHotelCapacities] = React.useState([]);
    const getHotelCapacities = async () => {
        try {
            const response = await fetch("http://localhost:3001/hotelCapacities");
            const jsonData = await response.json();
            
            setHotelCapacities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        getHotelCapacities();
      }, []);
    // console.log(hotelCapacities)

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Hotel Size</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hotelSize}
                    label="Hotel Size"
                    onChange={handleChange}
                >
                    {hotelCapacities.map(hotelCapacity => (
                        <MenuItem key={hotelCapacity.num_rooms} value={hotelCapacity.num_rooms}>{hotelCapacity.num_rooms}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function InputSlider() {
    const [pricePerDay, setPricePerDay] = React.useState(300);

    const handleSliderChange = (event, newValue) => {
        setPricePerDay(newValue);
        window.localStorage.setItem('priceperday', event.target.value);
    };

    const handleInputChange = (event) => {
        setPricePerDay(event.target.value === '' ? '' : Number(event.target.value));
    };

    const [maxPrice, setMaxPrice] = React.useState({ maxprice: null});
    
    const getMaxPrice = async () => {
        try {
            const response = await fetch("http://localhost:3001/maxRoomPrice");
            const jsonData = await response.json();
            setMaxPrice(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        getMaxPrice();
      }, []);
    // console.log(maxPrice)
    const maximumPrice = maxPrice.maxprice || 999

    const handleBlur = () => {
        if (pricePerDay < 0) {
            setPricePerDay(0);
        } else if (pricePerDay > maximumPrice) {
            setPricePerDay(maximumPrice);
        }
    };

    return (
        <Box sx={{ width: 400 }}>
            <Typography id="input-slider" gutterBottom>
                Price Per Night
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        min={0}
                        max={maximumPrice}
                        onChange={handleSliderChange}
                        value={typeof pricePerDay === 'number' ? pricePerDay : 0}
                        step={1}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={pricePerDay}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 1000,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

function ColumnsGrid() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={3} columns={16}>
                <Grid item xs={4}>
                    <Item>
                        <BasicSelectHotelChain/>
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                        <BasicDateRangePicker/>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <BasicSelectNoOfStars/>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <BasicSelectCountry/>
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={3} columns={16}>
                <Grid item xs={4}>
                    <Item>
                        <BasicSelectRoomCapacity/>
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                        <BasicSelectHotelSize/>
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                        <InputSlider/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default function MediaCard() {
    window.localStorage.clear()
    return (
        <Card sx={{ maxWidth: 1500}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    What are you looking for?
                </Typography>
                <ColumnsGrid/>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained">Search</Button>
            </CardActions>
        </Card>
);
}