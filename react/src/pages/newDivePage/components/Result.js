import React from 'react';

const Result = (props) => {
  return (
    <li className='result' onClick={props.clickHandler} id={props.id}>{props.name}</li>
  )
}

export default Result;
