import React from 'react';
import './App.css'; // Assuming you have some CSS file for styling

import WineStats from './winestats'; // Assuming WineStats component is in WineStats.js
import data from './wineData.json'; // Assuming wineData.json is in the project directory
import { WineDataItem } from './types'; // Import WineDataItem type

function App() {
  return (
    <div className="App">
      <WineStats data={data as WineDataItem[]} />
    </div>
  );
}

export default App;
