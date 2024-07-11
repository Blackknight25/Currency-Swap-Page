import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CurrencyList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CurrencyCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 120px;
`;

const CurrencyName = styled.h3`
  margin-bottom: 10px;
`;

const CurrencyPrice = styled.p`
  font-weight: bold;
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

const TrendingSection = styled.div`
  grid-column: 1 / -1; /* Span across all columns */
  padding: 20px;
  border-radius: 10px;
`;

const TrendingHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
`;



const BuyForm = ({ currencies }) => {

    const trendingCurrencies = currencies.filter(
        (crypto) => crypto.currency === 'ETH' || crypto.currency === 'RATOM' || crypto.currency === 'IRIS'
    );

    // Filtering out the top 3 trending currencies from the main list
    const otherCurrencies = currencies.filter(
        (crypto) => crypto.currency !== 'ETH' && crypto.currency !== 'RATOM' && crypto.currency !== 'IRIS'
    );
    const handleClick = () => {
        alert(`Please connect wallet first`);
    }

    return (
        <CurrencyList>
            <TrendingSection>
                <TrendingHeader>Trending Currencies</TrendingHeader>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: '10px' }}>
                {trendingCurrencies.map((crypto) => (
                    <CurrencyCard key={crypto.currency} style={{ backgroundColor: 'purple', color: 'white'}}>
                        <CurrencyName>{crypto.currency}</CurrencyName>
                        <CurrencyPrice>Price: {crypto.price.toFixed(8)}</CurrencyPrice>
                        <Button onClick={() => handleClick(crypto.currency)}>Buy {crypto.currency}</Button>
                    </CurrencyCard>
                ))}
                </div>
            </TrendingSection>

            {/* Render remaining currencies */}
            <TrendingSection>
            <TrendingHeader>All Other Currencies</TrendingHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: '20px'}}>
            {otherCurrencies.map((crypto) => (
                <CurrencyCard key={crypto.currency} style={{ backgroundColor: 'lightpink'}}>
                    <CurrencyName>{crypto.currency}</CurrencyName>
                    <CurrencyPrice>Price: {crypto.price.toFixed(8)}</CurrencyPrice>
                    <Button onClick={() => handleClick(crypto.currency)}>Buy {crypto.currency}</Button>
                </CurrencyCard>
            ))}
            </div>
            </TrendingSection>
        </CurrencyList>
    );
};

export default BuyForm;