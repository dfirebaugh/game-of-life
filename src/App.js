import React from 'react';
import './App.css';
import Grid from './Components/Grid.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {size:35}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    this.setState({size:document.getElementById('gridSize').value})
  }
  render() {
    return (
      <div className="App">
      <h2> Game of Life with ReactJS</h2>
      <div className='inforContainer'>
        <h4>Grid Height</h4>
        <input type='text' id='gridSize' name='size' defaultValue={this.state.size}>
        </input>
        <div className='btn' type='submit' name='submit' onClick={this.handleSubmit}>
          submit
        </div>

      </div>
      <Grid size={this.state.size} />
      </div>
    );
  }
}

export default App;
