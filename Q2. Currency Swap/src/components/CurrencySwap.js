import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #bf80ff;
  max-width: 800px;
  max-height: 600px;
  margin: 0 auto;
`;

const FormField = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CircularButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  cursor: pointer;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const CurrencySwapForm = ({ currencies }) => {
    const [amount, setAmount] = useState('');
    const [buyAmount, setBuyAmount] = useState('');
    const [fromCurr, setFromCurr] = useState('');
    const [toCurr, setToCurr] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Calculate exchange rate whenever fromCurr or toCurr changes
        if (fromCurr && toCurr) {
            const rate = calcExchangeRate(fromCurr, toCurr);
            setExchangeRate(rate);
        }
    }, [fromCurr, toCurr, currencies]);

    const calcExchangeRate = (from, to) => {
        const fromPrice = currencies.find(item => item.currency === from)?.price;
        const toPrice = currencies.find(item => item.currency === to)?.price;

        if (fromPrice && toPrice) {
            return toPrice / fromPrice;
        }

        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fromCurr || !toCurr) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        const rate = calcExchangeRate(fromCurr, toCurr);
        if (rate) {
            const converted = amount * rate;
            const display = `Converted ${amount} ${fromCurr} to ${converted.toFixed(4)} ${toCurr}`;
            setMessage(display);
        } else {
            setMessage('');
        }
    };

    const handleFlip = () => {
        const tempFromCurr = fromCurr;
        const tempToCurr = toCurr;
        setFromCurr(tempToCurr);
        setToCurr(tempFromCurr);

        const tempAmount = amount;
        const tempBuyAmount = buyAmount;
        setAmount(buyAmount);
        setBuyAmount(amount);
        
    }

    const handleAmountChange = (value) => {
        setAmount(value);
        if (fromCurr && toCurr) {
            const rate = calcExchangeRate(fromCurr, toCurr);
            if (rate) {
                const converted = value * rate;
                setBuyAmount(converted); // Update buyAmount based on amount and exchange rate
            }
        }
    };

    const handleBuyAmountChange = (value) => {
        setBuyAmount(value);
        if (fromCurr && toCurr) {
            const rate = calcExchangeRate(toCurr, fromCurr);
            const converted = value * rate;
            setAmount(converted.toFixed(8));
        }
    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label style={{ fontWeight: 'bold' }}>To Sell</Label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        style={{ width: '200px' }}
                        placeholder='Amount'
                        disabled={!fromCurr || !toCurr}
                        required
                    />
                    <Select
                        value={fromCurr}
                        onChange={(e) => setFromCurr(e.target.value)}
                        style={{ width: '200px' }}
                        required
                    >
                        <option value="">Select a Currency</option>
                        {currencies.map((crypto) => (
                            <option key={crypto.currency} value={crypto.currency}>
                                {crypto.currency}
                            </option>
                        ))}
                    </Select>
                </FormField>
                <CircularButton type="button" onClick={handleFlip}>
                    ↕ Flip
                </CircularButton>
                <FormField>
                    <Label style={{ fontWeight: 'bold' }}>To Buy</Label>
                    <Input
                        type="number"
                        value={buyAmount}
                        onChange={(e) => handleBuyAmountChange(e.target.value)}
                        style={{ width: '200px' }}
                        placeholder='Amount'
                        disabled={!fromCurr || !toCurr}
                        required
                    />
                    <Select
                        value={toCurr}
                        style={{ width: '200px' }}
                        onChange={(e) => setToCurr(e.target.value)}
                        required
                    >
                        <option value="">Select a Currency</option>
                        {currencies.map((crypto) => (
                            <option key={crypto.currency} value={crypto.currency}>
                                {crypto.currency}
                            </option>
                        ))}
                    </Select>
                </FormField>

                {exchangeRate && (
                    <p>Exchange Rate: 1 {fromCurr} = {exchangeRate.toFixed(4)} {toCurr}</p>
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </form>
        </FormWrapper>
    )
}

export default CurrencySwapForm;
