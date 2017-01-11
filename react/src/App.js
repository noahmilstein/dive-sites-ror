import React from 'react';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    divesites: [],
    lat: null,
    lng: null,
    radius: null
  };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.setState = this.setState.bind(this);
  this.createSiteList = this.createSiteList.bind(this);
  this.convertToLatLng = this.convertToLatLng.bind(this);
}

  componentDidMount() {
    this.fetchDivesites()
  }

  fetchDivesites() {
    fetch('/api/v1/divesites.json')
      .then(response => response.json())
      .then(data => this.setState({divesites: data}))
      // catch errors
  }

  convertToLatLng(lat, lng) {
    return new google.maps.LatLng(lat, lng);
  }

  // filters list by location and radius, creates jsx for refined list
  createSiteList() {
    const centerPoint = this.convertToLatLng(this.state.lat, this.state.lng);
    const radius = this.state.radius;
    // computeDistanceBetween is not working

    // const _this = this;
    const sites = this.state.divesites.filter(site => {
      const siteCoordinates = this.convertToLatLng(parseFloat(site.latitude), parseFloat(site.longitude));
      return google.maps.geometry.spherical.computeDistanceBetween(centerPoint, siteCoordinates) <= parseFloat(radius * 1000);
      // Uncaught TypeError: Cannot read property 'convertToLatLng' of undefined
      // all sites return false. Why?
      // return google.maps.geometry.spherical.computeDistanceBetween(centerPoint, this.convertToLatLng(parseFloat(site.latitude), parseFloat(site.longitude))) <= parseFloat(radius * 1000);
    })

    sites.map(site => {
      return <li>{site.name}</li>
    })
  }

  handleSubmit() {
    const location = document.querySelector('.location').value;
    let radius = document.querySelector('.radius').value;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCOq298WuE1r_3LH7fwCRW2gJGhohj2qPQ`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          radius: radius
        }, function() {
          this.createSiteList()
        })
      })
  }
  
  // state is being set after the handleSubmit fully executes,
  // so currently we cannot operate on the changed state within the handleSubmit function
  render() {
    let sites;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
        <ul>
          {sites}
        </ul>
      </div>
    );
  }
};

export default App;
