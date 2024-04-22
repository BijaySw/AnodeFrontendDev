import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Orders() {
  return <div>Orders content</div>;
}

function Recent() {
  return <div>Recent content</div>;
}

function Positions() {
  return <div>Positions content</div>;
}

function Balances() {
  return <div>Balances content</div>;
}

function Credits() {
  return <div>Credits content</div>;
}

function Transfers() {
  return <div>Transfers content</div>;
}

function BottomPanel() {
  const [activeTab, setActiveTab] = useState('Orders');

  const TabContent = () => {
    switch (activeTab) {
      case 'Orders':
        return <Orders />;
      case 'Recent':
        return <Recent />;
      case 'Positions':
        return <Positions />;
      case 'Balances':
        return <Balances />;
      case 'Credits':
        return <Credits />;
      case 'Transfers':
        return <Transfers />;
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: 'lightcoral', padding: '10px' }}>
      <div>
        <button type="button" class="btn btn-primary" onClick={() => setActiveTab('Orders')}>Orders</button>
        <button type="button" class="btn btn-secondary" onClick={() => setActiveTab('Recent')}>Recent</button>
        <button type="button" class="btn btn-primary" onClick={() => setActiveTab('Positions')}>Positions</button>
        <button type="button" class="btn btn-success" onClick={() => setActiveTab('Balances')}>Balances</button>
        <button type="button" class="btn btn-primary" onClick={() => setActiveTab('Credits')}>Credits</button>
        <button type="button" class="btn btn-warning" onClick={() => setActiveTab('Transfers')}>Transfers</button>
      </div>
      <div>
        <TabContent />
      </div>
    </div>
  );
}

export default BottomPanel;