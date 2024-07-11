import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Walletto = styled.div`

  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 16px;
`;

const WalletCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #e6e6fa;
`;

const CryptoName = styled.h3`
  margin: 0;
`;

const CryptoAmount = styled.p`
  margin: 8px 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const handleSend = (cryptoName) => {
    alert(`Sending ${cryptoName} to wallet.`);
}



const Wallet = () => {


    const [walletData, setWalletData] = useState([
        {id: 1, name: "Bitcoin", amount: 500.93930044},
        {id: 2, name: "Ethereum", amount: 200.99234933},
        {id: 3, name: "USDC", amount: 300.84329847},
    ]);

    return (
        <Walletto>
        <div>
            {walletData.map((crypto) =>(
                <WalletCard key={crypto.id} >
                    <CryptoName>{crypto.name}</CryptoName>
                    <CryptoAmount>{crypto.amount}</CryptoAmount>
                    <Link to="/"><Button >Sell {crypto.name}</Button></Link>
                    
                    <Button onClick={() => handleSend(crypto.name)}>Send</Button>
                </WalletCard>
            ))}
        </div>
        </Walletto>
    );

}

export default Wallet;