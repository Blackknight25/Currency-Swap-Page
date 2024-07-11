import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BoxProps } from '@mui/material/Box'; // Assuming BoxProps is from @mui/material
import useWalletBalances from './useWalletBalances'; 
import WalletRow from './WalletRow';

interface WalletBalance {
    currency: string;
    amount: number;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  class Datasource {
    constructor(private url: string) {}
  
    async getPrices() {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      return response.json();
    }
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState<{ [currency: string]: number }>({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices()
        .then(prices => setPrices(prices))
        .catch(error => console.error(error)); // Fixed typo
    }, []);
  
    const getPriority = useCallback((blockchain: string): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100;
        case 'Ethereum':
          return 50;
        case 'Arbitrum':
          return 30;
        case 'Zilliqa':
          return 20;
        case 'Neo':
          return 20;
        default:
          return -99;
      }
    }, []);
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.currency); // Fixed usage
        if (balancePriority > -99 && balance.amount <= 0) {
          return true;
        }
        return false;
      }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.currency);
        const rightPriority = getPriority(rhs.currency);
        return rightPriority - leftPriority; // Simplified comparison
      });
    }, [balances, prices, getPriority]);
  
    const formattedBalances = useMemo(() => {
      return sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed()
      }));
    }, [sortedBalances]);
  
    const rows = useMemo(() => {
      return formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = (prices[balance.currency] || 0) * balance.amount; // Added fallback logic
        return (
          <WalletRow 
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      });
    }, [formattedBalances, prices]);
  
    return (
      <div {...rest}>
        {rows}
      </div>
    );
  };
  