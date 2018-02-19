import React from 'react';
import Cell from './Cell.js';
import Generation from './Generation.js';
import Buttons from './Buttons.js';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = { generation: 0, grid: [], toggle: false, paused: true };

    this.getNeighbors = this.getNeighbors.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleClickGen = this.handleClickGen.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
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
    // console.log(arr)
    return arr;
  }

  eachCell(grid, fn){
    //iterates through the 2d array and runs a function on each cell
    return  grid.map((row)=>row.map((cell)=>fn(cell, grid)))
  }

  clear(grid) {
    // Makes all Cells dead -- isAlive = false -- returns grid
    grid.map((col, y) => col.map((currCell, x) => currCell.isAlive = false))

    return grid;
  }

  toggleAlive(cell) {
    //toggle Cell from alive and not alive

    (cell.isAlive ? cell.isAlive = false : cell.isAlive = true)
  }

  isWithinGrid(row, col) {
    //determines if Cell is within grid and returns bool
    return row >= 0 && row < this.props.size && col >= 0 && col < this.props.size * 2;
  }

  gameLogic(cell){
    if (cell.isAlive) {
      if (cell.neighbors < 2) {
        return cell.isAlive = false;
      }
      if (cell.neighbors > 3) {
        return cell.isAlive = false;
      }
    }
    else {
      if (cell.neighbors === 3) {
        return cell.isAlive = true;
      }
    }
  }

  getNeighbors(cell, grid) {
    //takes coords and returns how many neighbors
    //gets the total of alive neighbors for a cell
    
    let neighborCells = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

    let neighbors = 0

    neighborCells.map((neighbor) => {
      let r = cell.pos.y + neighbor[0];
      let c = cell.pos.x + neighbor[1];

      if (this.isWithinGrid(r, c)) {
      if (grid[r][c].isAlive) {
          neighbors++;
        }
      }
      return neighbors;
    })
    // console.log(neighbors)
    return cell.neighbors = neighbors;
  }

  generate() {
    let gen = this.state.generation

    //run getNeighbors on each cell
    this.eachCell(this.state.grid,this.getNeighbors);
    //run gameLogic on each cell
    this.eachCell(this.state.grid,this.gameLogic);

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

  render() {
    // this.eachCell(this.state.grid, console.log)
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

    //populates the cells array with Cell Components
    let cells = this.state.grid.map((currRow,i)=>{
      let row = currRow.map((currCell, j) => {
        return <Cell key={j} isAlive={currCell.isAlive} cellObj={currCell} parentMethod={this.toggleAlive} />
      })
      return <div key={i} style={rowStyle}>{row}</div>
    })

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
