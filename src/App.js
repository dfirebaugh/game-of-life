import React from 'react';
import './App.css';
import Grid from './Components/Grid.js';
import Generation from './Components/Generation.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid size={16} />
        <Generation />
      </div>
    );
  }
}

export default App;
