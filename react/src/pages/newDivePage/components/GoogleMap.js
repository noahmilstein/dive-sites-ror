import React from 'react';

const GoogleMap = (props) => {

  // class GoogleMap extends React.Component {}

  // shouldComponentUpdate() {
  //   return false;
  // }

  // componentDidMount() {
  //   this.map = new google.maps.Map(this.refs.map, {
  //     center: { lat: this.props.lat, lng: this.props.lng },
  //     zoom: 8
  //   });
  // }

  return (
    <div>
      <h3>I'm a map!</h3>
      <div id='map' />
    </div>
  )
}

export default GoogleMap;
