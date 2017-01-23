import React from 'react';

const Dive = (props) => {
  return (
    <li className='dive' id={props.id}>
      <ul>
        <li>{props.datetime}</li>
        <li>{props.airTemp}</li>
        <li>{props.waterTemp}</li>
        <li>{props.waveHeight}</li>
        <li>{props.windSpeed}</li>
        <li>{props.windDirection}</li>
        <li>{props.weatherDesc}</li>
        <li>{props.precipitation}</li>
      </ul>
    </li>
  )
}

export default Dive;
