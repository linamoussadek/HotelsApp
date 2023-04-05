import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import Employee from './Employee'
import EmployeeLogin from './EmployeeLogin'
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Home from "./Home";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


