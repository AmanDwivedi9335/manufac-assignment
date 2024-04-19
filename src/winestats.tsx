// winestats.tsx
import React, { useState, useEffect } from 'react';
import { WineDataItem } from './types'; // Import WineDataItem type

const WineStats = ({ data }: { data: WineDataItem[] }) => {
  const [stats, setStats] = useState<{ Class: string; Mean: number; Median: number; Mode: string }[]>([]);

  useEffect(() => {
    // Calculate statistical measures
    const calculateStats = () => {
        const classes: { [key: string]: number[] } = {};
        
        // Iterate through the data items
        data.forEach((item) => {
          const { Alcohol, Flavanoids } = item;
          // Use Alcohol property as the class identifier
          if (!classes[Alcohol.toString()]) {
            classes[Alcohol.toString()] = [];
          }
          // Ensure Flavanoids is a number before pushing it
          const flavanoidsNumber = typeof Flavanoids === 'string' ? parseFloat(Flavanoids) : Flavanoids;
          if (!isNaN(flavanoidsNumber)) { // Check if it's a valid number
            classes[Alcohol.toString()].push(flavanoidsNumber);
          }
        });
      
        // Calculate statistics for each class
        const classStats = Object.entries(classes).map(([className, values]) => ({
          Class: className,
          Mean: calculateMean(values),
          Median: calculateMedian(values),
          Mode: calculateMode(values),
        }));
      
        setStats(classStats);
      };
      

    calculateStats();
  }, [data]);

  const calculateMean = (values: number[]) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const calculateMedian = (values: number[]) => {
    const sortedValues = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    } else {
      return sortedValues[mid];
    }
  };

  const calculateMode = (values: number[]) => {
    const freqMap: { [key: number]: number } = {};
    values.forEach((val) => {
      freqMap[val] = (freqMap[val] || 0) + 1;
    });
    
    let mode: number | undefined; // Initialize mode with an undefined value
    
    let maxFreq = -1;
    for (const val in freqMap) {
      if (freqMap[val] > maxFreq) {
        mode = parseFloat(val);
        maxFreq = freqMap[val];
      }
    }
    
    // If mode is still undefined, return an appropriate message
    if (mode === undefined) {
      return "No mode found";
    }
    
    return mode.toString();
  };  

  return (
    <div>
      <h2>Flavanoids Statistical Measures</h2>
      <table align='center' style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid black', padding: '8px' }}>Measure</th>
      {stats.map((stat) => (
        <th key={stat.Class} style={{ border: '1px solid black', padding: '8px' }}>Alcohol {stat.Class}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ border: '1px solid black', padding: '8px' }}>Mean</td>
      {stats.map((stat) => (
        <td key={stat.Class} style={{ border: '1px solid black', padding: '8px' }}>{stat.Mean.toFixed(2)}</td>
      ))}
    </tr>
    <tr>
      <td style={{ border: '1px solid black', padding: '8px' }}>Median</td>
      {stats.map((stat) => (
        <td key={stat.Class} style={{ border: '1px solid black', padding: '8px' }}>{stat.Median.toFixed(2)}</td>
      ))}
    </tr>
    <tr>
      <td style={{ border: '1px solid black', padding: '8px' }}>Mode</td>
      {stats.map((stat) => (
        <td key={stat.Class} style={{ border: '1px solid black', padding: '8px' }}>{stat.Mode}</td>
      ))}
    </tr>
  </tbody>
</table>


    </div>
  );
};

export default WineStats;
