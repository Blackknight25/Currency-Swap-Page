import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 0;
`;

const Tab = styled(NavLink)`
  padding: 10px 20px;
  text-decoration: none;
  color: #555;
  border: 2px solid transparent;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
    border-color: #ccc;
  }

  &.active {
    background-color: #fff;
    border-color: #333;
    font-weight: bold;
  }
`;

const Tabs = () => (
  <TabsWrapper>
    <Tab exact to="/" activeClassName="active">Currency Swap</Tab>
    <Tab to="/tab1" activeClassName="active">Wallet</Tab>
    <Tab to="/tab2" activeClassName="active">Buy</Tab>
  </TabsWrapper>
);

export default Tabs;
