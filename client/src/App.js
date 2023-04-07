import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import EmployeeLogin from './EmployeeLogin'
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Home from "./Home";
import Employee from "./Employee";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Employee_Portal" element={<EmployeeLogin />} />
                    <Route path="/Employee_Page" element={<Employee />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


