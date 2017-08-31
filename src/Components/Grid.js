import React from 'react';
import Cell from './Cell.js'

class Grid  extends React.Component{
  constructor(){
    super();
    this.state = {size: 22,grid:[],neighborCells:[ [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1] ]}
  }
  componentWillMount(){
    function Cell() {
			this.isAlive = false;
			this.neighbors = 0;
		}
    var grid = [];
		for (var i = 0; i < this.state.size; i++) {
			var row = [];
			for (var j = 0; j < this.state.size; j++) {
				row.push(new Cell());
			}
			grid.push(row);
		}
    this.setState({ grid: grid });
  }

  updateCellState(row,col){
    var cell = this.state.grid[row][col];
    cell.isAlive = true;

  }
  render(){
    // this.updateCellState(0,1)

    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

		var gridStyle = {
      position:'relative',
      display:'inline-block',
      margin:'0 auto',
      border:'4px solid red',
			margin: "0 auto",
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
		for (var i = 0; i < this.state.size; i++) {
			var row = [];
			for (var j = 0; j < this.state.size; j++) {
				var cell = this.state.grid[i][j];
				row.push(<Cell  key={i + j} isAlive={cell.isAlive} row={i} col={j} />);
			}
			cells.push(<div style={rowStyle}>{row}</div>);
		}

		return (
			<div className="container text-center">
				<div style={gridStyle}>
					{cells}
				</div>

			</div>
		);
	}
}



export default Grid;
