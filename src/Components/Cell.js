import React from 'react';


class Cell extends React.Component{
  constructor(){
    super();
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
    // Grid.updateCellState(this.props.row,this.props.col);
    this.setState({isAlive:!this.state.isAlive});
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
			<div onClick={this.handleClick} style={cellStyle}>{(this.props.col === 0 ? this.props.row : this.props.col)}</div>
		);
  }
}


export default Cell;