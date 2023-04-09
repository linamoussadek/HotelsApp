import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Popup from 'reactjs-popup';
import './CustomPopup.css';

// const [registerInfo, setRoomCapacity] = React.useState(
//     {
//         firstname: '',
//         lastname: '',
//         ssn: '',
//         street: '',
//         city: '',
//         stateorprovince: '',
//         country: ''
//     }
// );
// const [loginInfo, setLoginInfo] = React.useState({ssn: ''})
function RegisterForm() {
    const fields = ["First Name", "Last Name", "SSN", "Empty", "Street", "City", "State/Province", "Country"]
    
    const [invalidFieldRegister, setInvalidFieldRegister] = React.useState(false);
    const [invalidFieldLogin, setInvalidFieldLogin] = React.useState(false);

    const [registerValues, setRegisterValues] = React.useState({
        'First Name': '', 'Last Name': '', 'SSN': '', 
        'Street': '', 'City': '', 'State/Province': '', 'Country': ''
    });

    const handleBookClick = () => {
        if (!(registerValues['SSN'].length === 9) || !isFinite((registerValues['SSN']))){
            setInvalidFieldRegister(true)
            console.log("FAIL LOGIN")
            return
        }
        for (let key in registerValues) {
            if (registerValues[key] === "") {
                alert("Cannot leave values empty")
                return
            }
        }
        console.log("SUCCESS LOGIN")
    };
    const handleFieldChange = (event) => {
        const { id, value } = event.target;
        setRegisterValues((prevState) => ({ ...prevState, [id]: value }));
    };

    const [loginValues, setLoginValues] = React.useState({'SSNLogin': ''});
    const handleBookClickLogin = () => { // Maybe query ssns and check not in array
        if (!(loginValues['SSNLogin'].length === 9) || !isFinite((loginValues['SSNLogin']))){
            setInvalidFieldLogin(true)
            console.log("FAIL LOGIN")
            return
        }
        console.log("SUCCESS LOGIN")
    };
    const handleFieldChangeLogin = (event) => {
        const { id, value } = event.target;
        setLoginValues((prevState) => ({ ...prevState, [id]: value }));
    };

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
                                        <TextField 
                                            error={field.localeCompare("SSN") === 0 ? invalidFieldRegister : false}
                                            helperText={invalidFieldRegister && field.localeCompare("SSN") === 0 ? 'Invalid SSN' : ''}
                                            id={field} label={field} variant="outlined" 
                                            value={registerValues[field]} onChange={handleFieldChange}
                                        />
                                    </Box>
                                )}
                            </Grid>
                    ))}
                </Grid>
                <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}} onClick={handleBookClick}>
                    Book
                </Button>
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
                        <TextField 
                            error={invalidFieldLogin}
                            helperText={invalidFieldLogin ? 'Invalid SSN' : ''}
                            id="SSNLogin" label="SSN" variant="outlined" 
                            value={loginValues["SSN"]} onChange={handleFieldChangeLogin}
                        />
                    </Box>
                </Grid>
            </Box>
            <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}} onClick={handleBookClickLogin}>
                Book
            </Button>
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

