import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Lina & Michael's website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


export default function SignIn() {
    const [employeeID, setEmployeeID] = React.useState(0);
    const handleInputChange = (event) => {
        setEmployeeID(isFinite(event.target.value) ? Number(event.target.value) : 0);
    };

    const [employees, setEmployees] = React.useState([]);
    const getEmployees = async () => {
        try {
            const response = await fetch(`http://localhost:3001/employees`);
            const jsonData = await response.json();
            setEmployees(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };


    const [failLogin, setFailLogin] = React.useState(false);
    let navigate = useNavigate(); 
    const navigateToEmployee = async () =>{ 
        // Check if ID is in the IDs list
        const employeeIDs = employees.map(employee => employee.employeeid)
        if (!employeeIDs.includes(employeeID)){
            setFailLogin(true)
            return
        }
        window.localStorage.setItem('employeeID', employeeID);
        let path = `/Employee_Page`; 
        navigate(path);
      }

      React.useEffect(() => {
        getEmployees();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ mt: 15}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                        <Avatar sx={{ m: 1}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={failLogin}
                            helperText={failLogin ? 'Could not find an employee with that ID' : ''}
                            margin="normal"
                            required
                            fullWidth
                            id="employeeID"
                            label="Employee ID"
                            name="EmployeeID"
                            autoFocus
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 5 }}
                            onClick={navigateToEmployee}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}