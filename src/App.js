import React from 'react';
import './style.css';
import Grid from './Components/Grid.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {size:35};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    this.setState({size:document.getElementById('gridSize').value});
  }
  render() {
    // <h2> Game of Life with ReactJS</h2>
    return (
      <div className="App">


      <Grid size={this.state.size} />
      </div>
    );
  }
}

export default App;
