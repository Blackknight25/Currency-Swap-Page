import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Tabs from './components/Tabs';
import Wallet from './pages/Wallet';
import Buy from './pages/BuyCoin';
import prices from './prices.json';
import TopNavBar from './components/navbar';


const App = () => {

  const [cryptoPrices, setCryptoPrices] = useState([]);

  useEffect(() => {
    // Mocking fetching prices (replace with actual fetch from API)
    prices.sort((a, b) => {
      if (a.currency < b.currency) {
        return -1;
      }
      if (a.currency > b.currency) {
        return 1;
      }
      return 0;
    });
    setCryptoPrices(prices);
  }, []);

  return (
    <Router>
      <div>
        <TopNavBar />
        <Tabs />
        <Routes>
          <Route exact path="/" element={<HomePage currencies={cryptoPrices} />} />
          <Route path="/tab1" element={<Wallet />} />
          <Route path="/tab2" element={<Buy currencies={cryptoPrices}/>} />

        </Routes>
      </div>
    </Router>
  )
}

export default App;
