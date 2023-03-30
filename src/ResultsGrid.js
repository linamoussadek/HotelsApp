import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
import Stack from '@mui/material/Stack';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
function MediaCardBeach() {
    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="./BeachView.png"
                title="view picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    *Room criteria*
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={(e) => setVisibility(!visibility)}>Book this room</Button>
                <CustomPopup
                    onClose={popupCloseHandler}
                    show={visibility}
                >
                    <RegisterForm/>
                </CustomPopup>
            </CardActions>
        </Card>
    );
}

function MediaCardMountain() {
    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="./MountainView.jpg"
                title="view picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    *Room criteria*
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={(e) => setVisibility(!visibility)}>Book this room</Button>
                <CustomPopup
                    onClose={popupCloseHandler}
                    show={visibility}
                >
                    <RegisterForm/>
                </CustomPopup>
            </CardActions>
        </Card>
    );
}

export default function RowAndColumnSpacing() {
    return (
        <Box sx={{ width: '100%', mt: 20, ml:2, mr:2, maxWidth:1500}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <MediaCardBeach/>
                </Grid>
                <Grid item xs={3}>
                    <MediaCardMountain/>
                </Grid>
                <Grid item xs={3}>
                    <MediaCardBeach/>
                </Grid>
                <Grid item xs={3}>
                    <MediaCardMountain/>
                </Grid>
            </Grid>
        </Box>
    );
}
