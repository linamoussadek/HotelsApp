import React from 'react';
import './App.css';
import HomeImage from "./HomeImage";
import SearchBox from "./SearchBox";
import ResultsGrid from "./ResultsGrid"


function Home() {
  return (
    <div className="Home" style={{backgroundColor:"rgba(247,249,252,0.86)"}}>
        <div className="container">
            <div className="home-image">
                <HomeImage />
            </div>
            <div className="search-box">
                <SearchBox />
            </div>
        </div>
        <ResultsGrid/>
    </div>
  );
}

export default Home;