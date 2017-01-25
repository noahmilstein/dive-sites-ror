import React from 'react';
import Dive from './Dive';

const DiveList = (props) => {
  let dives = props.data.map(dive => {
    return (
      <Dive
        key={dive.id}
        id={dive.id}
        datetime={dive.datetime}
        airTemp={dive.air_temp}
        waterTemp={dive.water_temp}
        waveHeight={dive.wave_height}
        windSpeed={dive.wind_speed}
        windDirection={dive.wind_direction}
        weatherDesc={dive.weather_description}
        precipitation={dive.precipitation}
      />
    )
  })
  return (
    <ul>
      {dives}
    </ul>
  )
}

export default DiveList;
