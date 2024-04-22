import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import './App.css'; // Assuming you have CSS file for styling
import BottomPanel from './components/BottomPanel/BottomPanel';
import LeftPanel from './components/LeftPanel/Watchlist';
import TopRightPanel from './components/RightPanel/OrderBook';

function App() {
  return (
    <SplitterLayout vertical={true} percentage={true} primaryIndex={0} primaryMinSize={10} secondaryMinSize = {10} secondaryInitialSize={20}>
      <SplitterLayout vertical={false} percentage={true} primaryIndex={0} primaryMinSize={25} primaryMaxSize={25} secondaryMinSize = {75} secondaryInitialSize={75} >
        <LeftPanel />
        <TopRightPanel />
      </SplitterLayout>
      <BottomPanel />
    </SplitterLayout>
  );
}

export default App;
