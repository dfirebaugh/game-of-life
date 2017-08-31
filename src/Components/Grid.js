import React from 'react';
import Cell from './Cell.js';

class Grid  extends React.Component{
  constructor(){
    super();
    this.state = {size: 1,grid:[],toggle:false,neighborCells:[ [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1] ]}

    this.clear = this.clear.bind(this)
    // this.updateCellState = this.updateCellState.bind(this)
  }
  componentWillMount(){
    function Cell() {
			this.isAlive = Math.random() > .93;
			this.neighbors = 0;
		}
    var grid = [];
		for (var i = 0; i < this.props.size; i++) {
			var row = [];
			for (var j = 0; j < this.props.size*2; j++) {
				row.push(new Cell());
			}
			grid.push(row);
		}
    this.setState({ grid: grid });
  }

  updateCellState(row,col){
    var cell = this.state.grid[row][col];
    cell.isAlive = true;
    console.log(row)

  }

  clear(){
    for(var v = 0;v<this.props.size;v++){
      for(var w = 0; w<this.props.size*2;w++){
        var cell = this.state.grid[v][w];
        cell.isAlive = false
      }
    }
    this.renderGrid()
  }

  isLonely(neighborCount){
    if(neighborCount< 2){
      return true;
    }
    else{
      return false;
    }
  }
  isCrowded(neighborCount){
    if(neighborCount > 3){
      return true
    }
    else{
      return false
    }
  }

  generate(){
    for(var v = 0;v<this.props.size;v++){
      for(var w = 0; w<this.props.size;w++){

      }
    }
  }
  renderGrid(){
    //this changes the state so that the grid rerenders -- i'm looking for a better way to do this.
  if(this.state.toggle ? this.setState({toggle:true}) : this.setState({toggle:false}));
}
  render(){
    // this.updateCellState(0,0)

    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

		var gridStyle = {
      position:'relative',
      display:'inline-block',
      margin:'0 auto',
      border:'4px solid red',
      marginTop: 30,
			WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
			MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
			boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
		};
    var rowStyle = {
      float:'left',
      clear:'both'
    };

		var cells = [];
		for (var i = 0; i < this.props.size; i++) {
			var row = [];
			for (var j = 0; j < this.props.size*2; j++) {
				var cell = this.state.grid[i][j];
				row.push(<Cell key={i + "," + j} isAlive={cell.isAlive} row={i} col={j} />);
			}
			cells.push(<div key={i+","+j} style={rowStyle}>{row}</div>);
		}

		return (
			<div className="container text-center">
				<div style={gridStyle}>
					{cells}
				</div>
        <div className='clearBtn btn' onClick={this.clear}>Clear</div>
			</div>
		);
	}
}



export default Grid;
