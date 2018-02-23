import React from 'react';

class Cell extends React.Component{
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    this.setState({isAlive: this.props.isAlive});
  }
  componentWillReceiveProps(nextProps){
    this.setState({isAlive:nextProps.isAlive});
  }
  handleClick(){
    this.setState({isAlive:!this.state.isAlive});
    this.props.parentMethod(this.props.cellObj);
    console.log(`clicked Cell alive: ${this.props.cellObj.isAlive} pos: ${this.props.cellObj.pos.y}, ${this.props.cellObj.pos.x}`)
  }
  render(){
    return (
      <div onClick={this.handleClick} className="cStyle" style={{background: this.state.isAlive ? "#FFF" : "#333"}}></div>
    );
  }
}


export default Cell;
