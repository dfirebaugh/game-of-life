import React from 'react';

class Buttons extends React.Component{
  render(){
    return(
      <div className='btnContainer'>
      <div className='clearBtn btn' onClick={this.props.clear}>Clear</div>
      <div id='generate' className='btn' onClick={this.props.handleClickGen}>Generate</div>
      <div className='btn' onClick={this.props.handleClickPause}>{(this.props.paused ? "Play": "Pause")}</div>
      </div>
    )
  }
}


export default Buttons;
