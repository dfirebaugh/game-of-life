import React from 'react';


class Cell extends React.Component{
  constructor(){
    super();
    this.state = {isAlive:null}
  }
  componentWillMount(){
    this.setState({isAlive: this.props.isAlive});
  }
  componentWillReceiveProps(nextProps){
    this.setState({isAlive:nextProps.isAlive});
  }
  render(){
    var cellStyle = {
      width: 24,
			height: 24,
			dislay: "inline-block",
			float: "left",
			border: "1px solid #000",
			background: this.state.isAlive ? "#FFF" : "#333"
    }

    return (
			<div onClick={this.onClick} style={cellStyle}>{this.props.col}</div>
		);
  }
}


export default Cell;
