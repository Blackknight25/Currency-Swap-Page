import React from 'react';
import WalletForm from '../components/Wallet';

const Wallet = ({currencies}) => (
    <div>
        <h1 style={{ paddingLeft: '50px' }}>Manage Wallet</h1>
        <WalletForm />
    </div>
);

export default Wallet;