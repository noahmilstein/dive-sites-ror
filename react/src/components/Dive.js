import React from 'react';

const Dive = (props) => {
  let dive;
  if (props.airTemp != '') {
    dive =  <ul>
              <li>{props.datetime}</li>
              Weather Report Pending
            </ul>;
  } else {
    dive =  <ul>
              <li>{props.datetime}</li>
              <li>{props.airTemp}</li>
              <li>{props.waterTemp}</li>
              <li>{props.waveHeight}</li>
              <li>{props.windSpeed}</li>
              <li>{props.windDirection}</li>
              <li>{props.weatherDesc}</li>
              <li>{props.precipitation}</li>
            </ul>
  }

  return (
    <li className='dive' id={props.id}>
      {dive}
    </li>
  )
}

export default Dive;
