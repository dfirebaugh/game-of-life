import React from 'react';

class Generation extends React.Component{
  constructor(){
    super()
    this.state={generation:0}
  }
  render(){
    return (
<h4> Generation: {this.props.gen}</h4>
    )
  }
}


export default Generation;
