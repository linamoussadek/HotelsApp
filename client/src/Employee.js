import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NoRoomsSnackbar from './ResultsGrid'


function AcceptButton({ bookingInfo, change }) {
    const accept = async() => {
        const employeeID = JSON.parse(window.localStorage.getItem('employee')).employeeid
        try {
            await fetch(
                `http://localhost:3001/bookingAccept/${employeeID}/${bookingInfo.roomno}/${bookingInfo.hotelid}`, 
                { method: "PUT" }
            );
            await change()
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <Stack spacing={2} direction="row" sx={{ml:10, mb:1}}>
            <Button variant="contained" onClick = {accept}>Confirm</Button>
        </Stack>
    );
}

function DiscardButton({ bookingInfo, change }) {

    const cancel = async() => {
        const employeeID = JSON.parse(window.localStorage.getItem('employee')).employeeid
        try {
            await fetch(
                `http://localhost:3001/bookingCancel/${employeeID}/${bookingInfo.roomno}/${bookingInfo.hotelid}`, 
                { method: "PUT" }
            );
            await change()
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <Stack spacing={2} direction="row" sx={{mb:1}}>
            <Button variant="outlined" onClick = {cancel}>Discard</Button>
        </Stack>
    );
}

function DisabledButton({ canceled, checkedin }) {
    // Past booking is either canceled, checked in, or expired
    const msg = canceled ? "Canceled" : (checkedin ? "Checked In" : "Expired")
    return (
        <Stack direction="row" spacing={2}>
            <Button disabled>{msg}</Button>
        </Stack>
    );
}


function BookingsList({endpoint, buttons }){
    const [employeeBookings, setEmployeeBookings] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    
    const getEmployeeBookings = async () => {
        try {
            const response = await fetch(endpoint);
            const jsonData = await response.json();
            setEmployeeBookings(jsonData);
            setIsLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    };
    React.useEffect(() => {
        getEmployeeBookings();
    }, []);
    // console.log(employeeBookings)
    if(isLoading) return <NoRoomsSnackbar text = "Loading..."></NoRoomsSnackbar>
    if(employeeBookings.length === 0) return <div>No bookings at this time</div>

    const employee = JSON.parse(window.localStorage.getItem('employee'))

    return (
        <>
        <div>{buttons && "Actionable bookings for employee "+employee.firstname+" "+employee.lastname}</div>
        <div>{buttons && "Employee ID: "+employee.employeeid}</div>
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', ml:50 }}>
            {employeeBookings.map(booking => (
                <ListItem alignItems="flex-start" key={booking.roomno+""+booking.hotelid+""+booking.startdate+"LI1"}>
                    <ListItemAvatar>
                        <Avatar alt={booking.firstname + " " + booking.lastname} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={booking.firstname + " " + booking.lastname}
                        secondary={
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div>{booking.hotelname + ", "}<br></br>{"Room " + booking.roomno}</div>
                                {"From " + 
                                new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(new Date(booking.startdate)) + " to "}
                                <br></br>
                                {new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(new Date(booking.enddate))}
                                {buttons &&
                                <>
                                    <AcceptButton bookingInfo = {booking} change={getEmployeeBookings}/>
                                    <DiscardButton bookingInfo = {booking} change={getEmployeeBookings}/>
                                </>
                                }
                                {!buttons &&
                                    <>
                                        <DisabledButton canceled = {booking.canceled} checkedin = {booking.checkedin}/>
                                    </>
                                }
                            </div>
                        }
                    />
                </ListItem>
                ))}
        </List>
        </>
    );
}

function AlignItemsListPending({ change }) {
    const employeeID = JSON.parse(window.localStorage.getItem('employee')).employeeid
    return <BookingsList endpoint={"http://localhost:3001/employeeBookingsNotOver/"+employeeID} buttons={true}/>;
}

function AlignItemsListHistory({ change }) {
    const employeeID = JSON.parse(window.localStorage.getItem('employee')).employeeid
    return <BookingsList endpoint={"http://localhost:3001/employeeBookingsOver/"+employeeID} buttons={false}/>;}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt:10}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="booking tabs" centered>
                    <Tab label="Pending Bookings" {...a11yProps(0)} />
                    <Tab label="Bookings History" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AlignItemsListPending/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AlignItemsListHistory/>
            </TabPanel>
        </Box>
    );
}