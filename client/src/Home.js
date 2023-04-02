import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import HomeImage from "./HomeImage";
import SearchBox from "./SearchBox";
import ResultsGrid from "./ResultsGrid"


function Home() {
  return (
    <div className="Home">
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