import React from 'react';

const Dive = (props) => {
  let dive;

  if (props.airTemp === null) {
    dive =  <ul>
              <li className='dive'>{props.datetime}</li>
              Weather Report Pending
            </ul>;
  } else {
    dive =  <ul>
              <li className='dive'>{props.datetime}</li>
              <li className='dive'>{props.airTemp}</li>
              <li className='dive'>{props.waterTemp}</li>
              <li className='dive'>{props.waveHeight}</li>
              <li className='dive'>{props.windSpeed}</li>
              <li className='dive'>{props.windDirection}</li>
              <li className='dive'>{props.weatherDesc}</li>
              <li className='dive'>{props.precipitation}</li>
            </ul>
  }

  return (
    <div>
      <h2>{props.name}</h2>
      {dive}
    </div>
  )
}

export default Dive;
