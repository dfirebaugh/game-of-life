import React from 'react';
import Cell from './Cell.js';
import Buttons from './Buttons.js';


const Generation = (props) => <h4> Generation: {props.gen}</h4>

class Grid extends React.Component {
  constructor() {
    super();
    this.state = { generation: 0, grid: [], paused: true, toggle: false };
  }

  componentDidMount = () => {
    this.handleClickPause();
  }

  componentWillMount = () => {
    //Cell Factory
    const Cell = {
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

  //adds new Cell objects into the the 2d array then returns that array
  populateGrid = (size, obj) => {

    let arr = Array.apply(null, Array(size)).map((currY, y) =>
      Array.apply(null, Array(size * 2)).map((currX, x) =>
        obj.init({ x, y })
      )
    );
    return arr;
  }

  //iterates through the 2d array and runs a function on each cell
  eachCell = (grid, fn) => grid.forEach(row=>row.forEach(cell=>fn(cell, grid)));

  //toggle Cell from alive and not alive
  toggleAlive = cell => {
    this.setState({toggle: !this.state.toggle});
    return cell.isAlive = !cell.isAlive
  };

  // Makes all Cells dead -- isAlive = false -- returns grid
  clear = grid => {
    this.eachCell(grid, c => c.isAlive = false)
    return grid;
  }

  //determines if Cell is within grid and returns bool
  isWithinGrid = (row, col) => {
    return row >= 0
            && row < this.props.size
            && col >= 0
            && col < this.props.size * 2;
  }

  gameLogic = cell => {
    
    if (cell.isAlive) {
      if (cell.neighbors < 2 || cell.neighbors > 3) {
        return cell.isAlive = false;
      }
    }
    else if(cell.neighbors === 3) {
      return cell.isAlive = true;
    }
  }

  //takes coords and returns total of alive neighbors for a cell
  getNeighbors = (cell, grid) => {

    let neighborCells = [
      [-1, 0], [-1, 1],
      [1, 0], [1, -1],
      [0, -1], [-1, -1],
      [0, 1], [1, 1]
    ];

    let neighbors = 0

    neighborCells.map((neighbor) => {
      let r = cell.pos.y + neighbor[0];
      let c = cell.pos.x + neighbor[1];

      if(this.isWithinGrid(r,c) && grid[r][c].isAlive) neighbors++;
      
      return neighbors;
    })

    return cell.neighbors = neighbors;
  }

  generate = () => {
    let gen = this.state.generation

    //run getNeighbors on each cell
    this.eachCell(this.state.grid,this.getNeighbors);
    //run gameLogic on each cell
    this.eachCell(this.state.grid,this.gameLogic);

    this.setState({ generation: gen + 1 })
  }

  // Event Handlers below
  handleClear = () => {
    this.setState({grid: this.clear(this.state.grid)})
  }

  //Toggles between paused and not paused
  handleClickPause = () =>  {
    this.setState({ paused: !this.state.paused })

    let loop = setInterval(() => {
      if (this.state.paused) {
        clearInterval(loop)
      } else {
        this.generate()
      }
    }, 1)

  }

  // goes through one generation
  handleClickGen = () => {
    this.generate();
  }

  //populates the cells array with Cell Components
  cellComponents = (grid) => {
    let cells = grid.map((currRow,i)=>{
      let row = currRow.map((currCell, j) => {
        return <Cell key={j} isAlive={currCell.isAlive} cellObj={currCell} parentMethod={this.toggleAlive} />
      })
      return <div key={i} style={rowStyle}>{row}</div>
    })
    return cells
  }

  render() {
    return (
      <div className="container text-center">
        <Generation gen={this.state.generation} />
        <Buttons handleClickGen={this.handleClickGen} handleClickPause={this.handleClickPause} clear={this.handleClear} paused={this.state.paused} />

        <div style={gridStyle}>
          {this.cellComponents(this.state.grid)}
        </div>
      </div>
    );
  }
}

//styles for this component
const gridStyle = {
  position: 'relative',
  display: 'inline-block',
  margin: '0 auto',
  border: '4px solid red',
  marginTop: 30,
  WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
  MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
  boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
};
const rowStyle = {
  display: 'flex',
  float: 'left',
  clear: 'both'
};


export default Grid;
