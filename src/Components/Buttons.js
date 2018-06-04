import React from 'react';

const Buttons = (props) => {
  return(
    <div className='btnContainer'>
    <div className='clearBtn btn' onClick={props.clear}>Clear</div>
    <div id='generate' className='btn' onClick={props.handleClickGen}>Generate</div>
    <div className='btn' onClick={props.handleClickPause}>{(props.paused ? "Play": "Pause")}</div>
    </div>
  )
}

export default Buttons;
