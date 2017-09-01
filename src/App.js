import React from 'react';
import './App.css';
import Grid from './Components/Grid.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid size={42} />
      </div>
    );
  }
}

export default App;
