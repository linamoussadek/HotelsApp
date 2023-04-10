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

    // Register part

    const fields = ["First Name", "Last Name", "SSN", "Empty", "Street", "City", "State/Province", "Country"]
    const [invalidFieldRegister, setInvalidFieldRegister] = React.useState(false);
    const [registerValues, setRegisterValues] = React.useState({
        'First Name': '', 'Last Name': '', 'SSN': '', 
        'Street': '', 'City': '', 'State/Province': '', 'Country': ''
    });

    // List of customer SSNs
    const [SSNs, setSSNs] = React.useState([]);
    const getSSNs = async () => {
        try {
            const response = await fetch(`http://localhost:3001/customerSSNs`);
            const jsonData = await response.json();
            setSSNs(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    const registerBooking = async() => {
        try {
            // Insert into Address, retrieve the new address
            const street = registerValues['Street']
            const city = registerValues['City']
            const sOrP = registerValues['State/Province']
            const country = registerValues['Country']
            let address = {}
            try {
                const response = await fetch(`http://localhost:3001/newAddress/${street}/${city}/${sOrP}/${country}`, {
                    method: "POST",
                });
                address = await response.json();
            } catch (err) {
                console.error(err.message);
            }

            console.log("Address: ", address)
            // Insert into Person, retrieve the new person
            const ssn = registerValues['SSN']
            const addressID = address.addressid
            const firstName = registerValues['First Name']
            const lastName = registerValues['Last Name']
            let person = {}
            try {
                const response = await fetch(`http://localhost:3001/newPerson/${ssn}/${addressID}/${firstName}/${lastName}`, {
                    method: "POST",
                });
                person = await response.json()
            } catch (err) {
                console.error(err.message);
            }

            console.log("Person: ", person)
            // Insert into Customer, retrieve the new customer
            const personSSN = person.ssn
            let customer = {}
            try {
                const response = await fetch(`http://localhost:3001/newCustomer/${personSSN}`, {
                    method: "POST",
                });
                customer = await response.json()
            } catch (err) {
                console.error(err.message);
            }

            console.log("Customer: ", customer)
            const customerID = customer.customerid
            // Insert into booking
            try {
                const booking = JSON.parse(window.localStorage.getItem('room'))
                const roomNo = booking.roomno
                const hotelID = booking.hotelid
                const startDate = window.localStorage.getItem('startdate')
                const endDate = window.localStorage.getItem('enddate')
                const endPoint = `http://localhost:3001/newBooking/${customerID}/${roomNo}/${hotelID}/${startDate}/${endDate}`;
                await fetch(endPoint, {
                    method: "POST",
                });
                window.location = "/";
                alert("Booking was successful")
            } catch (err) {
                console.error(err.message);
            }
        } catch (err) {
            console.error(err.message);
        }
      };
    const handleBookClickRegister = () => {
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
        if (SSNs.map(entry => entry.ssn).includes(registerValues['SSN'])) {
            alert("SSN is already in use")
            return
        }
        registerBooking()
    };
    const handleFieldChange = (event) => {
        const { id, value } = event.target;
        setRegisterValues((prevState) => ({ ...prevState, [id]: value }));
    };

    // Login part
    const [invalidFieldLogin, setInvalidFieldLogin] = React.useState(false);
    const [loginValues, setLoginValues] = React.useState({'SSNLogin': ''});
    const loginBooking = async() => {
        try {
            const customerID = SSNs.find(entry => entry.ssn === loginValues['SSNLogin']).customerid;
            const booking = JSON.parse(window.localStorage.getItem('room'))
            const roomNo = booking.roomno
            const hotelID = booking.hotelid
            const startDate = window.localStorage.getItem('startdate')
            const endDate = window.localStorage.getItem('enddate')
            const endPoint = `http://localhost:3001/newBooking/${customerID}/${roomNo}/${hotelID}/${startDate}/${endDate}`;
            await fetch(endPoint, {
                method: "POST",
            });
            window.location = "/";
            alert("Booking was successful")
        } catch (err) {
            console.error(err.message);
        }
      };
    const handleBookClickLogin = () => {
        if (!(loginValues['SSNLogin'].length === 9) || !isFinite((loginValues['SSNLogin']))){
            setInvalidFieldLogin(true)
            console.log("FAIL LOGIN")
            return
        }
        if (!(SSNs.map(entry => entry.ssn).includes(loginValues['SSNLogin']))) {
            alert("Cannot find an account with that ssn")
            return
        }
        loginBooking()
    };
    const handleFieldChangeLogin = (event) => {
        const { id, value } = event.target;
        setLoginValues((prevState) => ({ ...prevState, [id]: value }));
    };

    React.useEffect(() => {
        getSSNs();
    }, []);

    return (
        <div className="popup-container">
            <h2 align={'center'}>First Booking? Register an account</h2>
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
                <Button variant="contained" sx={{ ml: 1, mt: 3, mb:3}} onClick={handleBookClickRegister}>
                    Book
                </Button>
            </Box>
            <hr/>
            <h2 align={'center'}>Already been here? Book with SSN</h2>
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

export default function CustomPopup({ room }) {
    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);
    const openPopup = () => {
        const start = window.localStorage.getItem('startdate')
        const end = window.localStorage.getItem('enddate')
        if (start === '1969-12-31' || end === '1969-12-31'){
            alert("Please set a start and end date for your booking")
            return
        }
        else if (Math.ceil((new Date(end)-new Date(start)) / (1000 * 60 * 60 * 24)) > 30){
            alert("Cannot make booking for more than 30 days")
            return
        }
        setOpen(o => !o)
        window.localStorage.setItem('room', JSON.stringify(room))
    }
    return (
        <div>
            <Button size="small" className="button" onClick={openPopup}>
                Book this room
            </Button>
            <Popup
                className="popup"
                open={open}
                modal
            >
                <div className="modal">
                    <button className="close" onClick={closeModal}>
                        &times;
                    </button>
                    <RegisterForm></RegisterForm>
                </div>
            </Popup>
        </div>
    )
}

