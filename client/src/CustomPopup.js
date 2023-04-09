import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Popup from 'reactjs-popup';
import './CustomPopup.css';


function RegisterForm() {
    const fields = ["First Name", "Last Name", "SSN", "Empty", "Street", "City", "State/Province", "Country"]
    return (
        <div className="popup-container">
            <h2 align={'center'}>First Booking? Register</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {fields.map(field => (
                            <Grid item xs={3} key={field+"G"}>
                                {field.localeCompare("Empty") === 0 ? null : (
                                    <Box
                                        component="form"
                                        sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                                        noValidate
                                        autoComplete="off">
                                        <TextField id={field} label={field} variant="outlined" />
                                    </Box>
                                )}
                            </Grid>
                    ))}
                </Grid>
                <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}}>Book</Button>
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
            <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}}>Book</Button>
        </div>
    );
}

export default function CustomPopup() {
    return (
        <Popup
            className="popup"
            trigger={<Button size="small" className="button">Book this room</Button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <RegisterForm></RegisterForm>
                </div>
            )}
        </Popup>
    )
}

