import React from 'react';

const LocationForm = (props) => {
  return(
    <div>
      <form onSubmit={props.data}>
        <label>
          Location:
          <input className="location" type="text" />
        </label>
        <label>
          Radius:
          <input className="radius" type="number" min="1" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default LocationForm;
