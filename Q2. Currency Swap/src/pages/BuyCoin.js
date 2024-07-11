import React from 'react';
import BuyForm from '../components/Buy';

const Buy = ({currencies}) => (
    <div>
        <h1 style={{ paddingLeft: '50px' }}>Buy Crypto</h1>
        <BuyForm currencies = {currencies}/>
    </div>
);

export default Buy;