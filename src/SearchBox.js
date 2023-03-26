import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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



function BasicSelectHotelBranch() {
    const [hotelBranch, setHotelBranch] = React.useState('');

    const handleChange = (event) => {
        setHotelBranch(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Hotel branch</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hotelBranch}
                    label="Hotel branch"
                    onChange={handleChange}
                >
                    <MenuItem value={"Le Ritz"}>Le Ritz</MenuItem>
                    <MenuItem value={"Holiday Inn"}>Holiday Inn</MenuItem>
                    <MenuItem value={"Sofitel"}>Sofitel</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function BasicSelectCountry() {
    const [country, setCountry] = React.useState('');

    const handleChange = (event) => {
        setCountry(event.target.value);
    };

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
                    <MenuItem value={"Canada"}>Canada</MenuItem>
                    <MenuItem value={"United States"}>United States</MenuItem>
                    <MenuItem value={"Mexico"}>Mexico</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function BasicSelectNoOfStars() {
    const [noOfStars, setnoOfStars] = React.useState('');

    const handleChange = (event) => {
        setnoOfStars(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Hotel Stars</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={noOfStars}
                    label="Number of stars"
                    label="noOfStars"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5+</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function BasicSelectRoomCapacity() {
    const [roomCapacity, setRoomCapacity] = React.useState('');

    const handleChange = (event) => {
        setRoomCapacity(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Room capacity</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomCapacity}
                    label="Room Capacity"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4+</MenuItem>
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
    const [hotelSize, setHotelSize] = React.useState('');

    const handleChange = (event) => {
        setHotelSize(event.target.value);
    };

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
                    <MenuItem value={10}>Up to 10 rooms</MenuItem>
                    <MenuItem value={50}>Up to 50 rooms</MenuItem>
                    <MenuItem value={100}>Up to 100 rooms</MenuItem>
                    <MenuItem value={200}>Up to 200 rooms</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function InputSlider() {
    const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 1000) {
            setValue(1000);
        }
    };

    return (
        <Box sx={{ width: 470 }}>
            <Typography id="input-slider" gutterBottom>
                Budget per night, per room
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
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
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} columns={16}>
                <Grid item xs={4}>
                    <Item>
                        <BasicSelectHotelBranch/>
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
    return (
        <Card sx={{ maxWidth: 1500 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    What are you looking for?
                </Typography>
                <ColumnsGrid/>
            </CardContent>
            <CardActions>
                <Button size="small">Search</Button>
            </CardActions>
        </Card>
    );
}