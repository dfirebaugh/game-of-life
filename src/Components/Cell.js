import React from 'react';

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.state = {isAlive:null}

    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount(){
    this.setState({isAlive: this.props.isAlive});
  }
  componentWillReceiveProps(nextProps){
    this.setState({isAlive:nextProps.isAlive});
  }
  handleClick(){
    this.setState({isAlive:!this.state.isAlive});
    this.props.parentMethod(this.props.row, this.props.col);
  }
  render(){
    var cellStyle = {
      width: 12,
			height: 12,
			dislay: "inline-block",
			float: "left",
			border: "1px solid #000",
			background: this.state.isAlive ? "#FFF" : "#333"
    }

    return (
			<div onClick={this.handleClick} style={cellStyle}></div>
		);
  }
}


export default Cell;
