import React from 'react';

const GoogleMap = (props) => {
  return (
    <div id='map' style={{display: props.radius !== null ? 'block' : 'none' }} />
  )
}

export default GoogleMap;
