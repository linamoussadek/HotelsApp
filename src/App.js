import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import HomeImage from "./HomeImage";
import SearchBox from "./SearchBox";
import ResultsGrid from "./ResultsGrid"
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/system";
import Employee from './Employee'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Home from "./Home";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Employee" element={<Employee />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


