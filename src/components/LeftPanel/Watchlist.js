import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MarketData from './MarketData';

function LeftPanel() {
  return <MarketData />
}

export default LeftPanel;