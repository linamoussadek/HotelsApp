import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import EmployeeLogin from './EmployeeLogin'
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Home from "./Home";
import Employee from "./Employee";
import {createTheme, ThemeProvider} from "@mui/material/styles";

function App() {
    return (
    <div className="App">
        <ThemeProvider theme={createTheme({
                palette:
                    {
                        primary:
                            {main: 'rgba(6,23,133,0.6)'},
                        secondary:
                            {main: '#5b5b5b'}
                    }
            }
        )}><Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Employee_Portal" element={<EmployeeLogin />} />
                <Route path="/Employee_Page" element={<Employee />} />
            </Routes>
        </Router>
        </ThemeProvider>
    </div>
    );
}

export default App;


