import React from 'react';

const Cell = (props) => {
  return (
    <div 
      onClick={()=> {
        props.parentMethod(props.cellObj);
        console.log(`clicked Cell alive: ${props.cellObj.isAlive} pos: ${props.cellObj.pos.y}, ${ props.cellObj.pos.x}`)
      }}
      className="cStyle"
      style={{background: props.isAlive ? "#FFF" : "#333"}}
      >
      </div>
  )
}
export default Cell;
