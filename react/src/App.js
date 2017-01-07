import React from 'react';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    divesites: [],
    lat: 0.0,
    lng: 0.0,
    radius: 0
  };
  this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount() {
    this.fetchDivesites()
  }

  fetchDivesites() {
    fetch('/api/v1/divesites.json')
      .then(response => response.json())
      .then(data => this.setState({divesites: data}))
  }

  convertToLatLng(lat, lng) {
    return new google.maps.LatLng(lat, lng)
  }

  // filters list by location and radius, creates jsx for refined list
  createSiteList() {
    const centerPoint = convertToLatLng(this.state.lat, this.state.lng);

    const sites = this.state.divesites.filter(site => {
      const siteCoordinates = convertToLatLng(parseInt(site.lat), parseInt(site.lng));
      return computeDistanceBetween(centerPoint, siteCoordinates) <= this.state.radius;
    })
    // create jsx refined list
    sites.map(site => {
      return <li>{site.name}</li>
    })

    console.log(sites);
    return sites;
  }

  handleSubmit() {
    const location = document.querySelector('.location').value;
    const radius = document.querySelector('.radius').value;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_GEOCODE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          radius: radius
        })
      })
      .then(createSiteList)
    })
  }

  render() {
    const sites = '';
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
