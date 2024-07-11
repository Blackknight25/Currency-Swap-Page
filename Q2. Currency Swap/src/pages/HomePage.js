import React from 'react';
import CurrencySwapForm from '../components/CurrencySwap';

const HomePage = ({currencies}) => (
    <div>
        <h1 style={{ paddingLeft: '50px' }}>Exchange Currency</h1>
        <CurrencySwapForm currencies = {currencies}/>
    </div>
);

export default HomePage;