import React from 'react';
import './App.css';
import ResultsGrid from "./ResultsGrid"


function Home() {
  window.localStorage.clear()
  return (
    <div className="Home" style={{backgroundColor:"rgba(247,249,252,0.86)"}}>
        <ResultsGrid/>
    </div>
  );
}

export default Home;