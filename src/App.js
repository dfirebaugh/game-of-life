import React from 'react';
import './style.css';
import Grid from './Components/Grid.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {size:35};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = () => {
    document.body.style.background = "#444";
    document.body.style.color = "#FAFAFA";
  }

  handleSubmit = e => {
    this.setState({size:document.getElementById('gridSize').value});
  }
  
  render = () => {
    return (
      <div className="App">
        <Grid size={this.state.size} />
      </div>
    );
  }
}

export default App;
