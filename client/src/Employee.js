import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function AcceptButton() {
    return (
        <Stack spacing={2} direction="row" sx={{ml:10, mb:1}}>
            <Button variant="contained">Confirm</Button>
        </Stack>
    );
}

function DiscardButton() {
    return (
        <Stack spacing={2} direction="row" sx={{mb:1}}>
            <Button variant="outlined">Discard</Button>
        </Stack>
    );
}

function AlignItemsListPending() {
    return (
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', ml:40 }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Ali Connor" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Ali Connors"
                    secondary={
                        <div style={{ display: 'flex', gap: '10px' }}>
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Room ABC, Hotel XYZ
                            </Typography>
                            {" — From DD/MM/YYYY to DD/MM/YYYY"}
                                <AcceptButton/>
                                <DiscardButton/>
                        </React.Fragment>
                        </div>

                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Ali Connor" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Ali Connors"
                    secondary={
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Room ABC, Hotel XYZ
                                </Typography>
                                {" — From DD/MM/YYYY to DD/MM/YYYY"}
                                <AcceptButton/>
                                <DiscardButton/>
                            </React.Fragment>
                        </div>

                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Ali Connor" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Ali Connors"
                    secondary={
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Room ABC, Hotel XYZ
                                </Typography>
                                {" — From DD/MM/YYYY to DD/MM/YYYY"}
                                <AcceptButton/>
                                <DiscardButton/>
                            </React.Fragment>
                        </div>

                    }
                />
            </ListItem>
        </List>
    );
}

function AlignItemsListHistory() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Eleanor Smith" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Eleanor Smith"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Room ABC, Hotel XYZ
                            </Typography>
                            {' — From DD/MM/YYYY to DD/MM/YYYY'}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}

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
                    <Typography>{children}</Typography>
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

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt:10}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="booking tabs">
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