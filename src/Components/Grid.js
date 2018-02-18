import React from 'react';
import Cell from './Cell.js';
import Generation from './Generation.js';
import Buttons from './Buttons.js';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = { generation: 0, grid: [], toggle: false, paused: true };

    this.populateGrid = this.populateGrid.bind(this);
    this.clear = this.clear.bind(this);
    this.generate = this.generate.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleClickGen = this.handleClickGen.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  componentDidMount() {
    // this.handleClickPause();
  }
  componentWillMount() {
    let Cell = {
      init(pos) {
        let newCell = Object.create(this);
        newCell.isAlive = Math.random() > .53;
        newCell.pos = {
          x: pos.x,
          y: pos.y
        }
        return newCell;
      }
    };

    this.setState({ grid: this.populateGrid(this.props.size, Cell) });
  }
  populateGrid(size, obj) {
    //adds new Cell objects into the the 2d array then returns that array
    let arr = Array.apply(null, Array(size)).map((currY, y) => Array.apply(null, Array(size * 2)).map((currX, x) => Object.create(obj).init({ x, y })))
    console.log(arr)
    return arr;
  }
  clear(grid) {
    // Makes all Cells dead -- isAlive = false -- returns grid
    grid.map((col, y) => col.map((currCell, x) => currCell.isAlive = false))

    return grid;
  }
  toggleAlive(row, col) {
    //toggle Cell from alive and not alive
    let cell = this.state.grid[row][col];
    (cell.isAlive ? cell.isAlive = false : cell.isAlive = true)
  }
  isWithinGrid(row, col) {
    //determines if Cell is within grid and returns bool
    return row >= 0 && row < this.props.size && col >= 0 && col < this.props.size * 2;
  }
  allCells(fun) {
    // cycles through the grid and runs function
    for (let v = 0; v < this.props.size; v++) {
      for (let w = 0; w < this.props.size * 2; w++) {
        let cell = this.state.grid[v][w];
        cell.neighbors = this.getNeighbors(v, w)
      }
    }
  }
  updateAllCells() {
    //Game of life logic
    for (let x = 0; x < this.props.size; x++) {
      for (let y = 0; y < this.props.size * 2; y++) {
        let cell = this.state.grid[x][y];
        if (cell.isAlive) {
          if (cell.neighbors < 2) {
            cell.isAlive = false;
          }
          if (cell.neighbors > 3) {
            cell.isAlive = false;
          }
        }
        else {
          if (cell.neighbors === 3) {
            cell.isAlive = true;
          }
        }
      }
    }
  }
  getNeighbors(row, col) {
    //takes coords and returns how many neighbors
    let neighborCells = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
    //gets the total of alive neighbors for a cell
    let neighbors = 0
    neighborCells.map((neighbor) => {
      let r = row + neighbor[0];
      let c = col + neighbor[1];
      if (this.isWithinGrid(r, c)) {
        if (this.state.grid[r][c].isAlive) {
          neighbors++;
        }
      }
      return neighbors;
    })
    // console.log(neighbors)
    return neighbors
  }
  generate() {
    let gen = this.state.generation
    this.allCells();
    this.updateAllCells();
    this.setState({ generation: gen + 1 })
  }

  // Event Handlers below
  handleClear(){
    this.setState({grid: this.clear(this.state.grid)})
  }

  handleClickPause() {
    //Toggles between paused and not paused
    (this.state.paused ? this.setState({ paused: false }) : this.setState({ paused: true }))

    let loop = setInterval(function () {
      if (this.state.paused) {
        clearInterval(loop)
      } else {
        this.generate()
      }
    }.bind(this), 1)

  }

  handleClickGen() {
    // goes through one generation
    this.generate();
  }

  handleCellClick(row, col) {
    console.log("cellClicked: " + row + "," + col)
    this.toggleAlive(row, col);
  }

  render() {

    document.body.style.background = "#333";
    document.body.style.color = "#FAFAFA";

    let gridStyle = {
      position: 'relative',
      display: 'inline-block',
      margin: '0 auto',
      border: '4px solid red',
      marginTop: 30,
      WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
      MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
      boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
    };
    let rowStyle = {
      display: 'flex',
      float: 'left',
      clear: 'both'
    };

    let cells = [];

    for (let i = 0; i < this.props.size; i++) {
      let row = [];
      for (let j = 0; j < this.props.size * 2; j++) {
        let cell = this.state.grid[i][j];
        row.push(<Cell key={i + "," + j} isAlive={cell.isAlive} row={i} col={j} parentMethod={this.handleCellClick} />);
      }
      cells.push(<div key={i} style={rowStyle}>{row}</div>);
    }

    return (
      <div className="container text-center">
        <Generation gen={this.state.generation} />
        <Buttons handleClickGen={this.handleClickGen} handleClickPause={this.handleClickPause} clear={this.handleClear} paused={this.state.paused} />

        <div style={gridStyle}>
          {cells}
        </div>
      </div>
    );
  }
}



export default Grid;
