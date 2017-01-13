import React from 'react';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    divesites: [],
    lat: null,
    lng: null,
    radius: null,
    reducedSites: [],
    selectedSite: ''
  };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.setState = this.setState.bind(this);
  this.createSiteList = this.createSiteList.bind(this);
  this.convertToLatLng = this.convertToLatLng.bind(this);
}

  componentDidMount() {
    this.fetchDivesites();
  }

  fetchDivesites() {
    fetch('/api/v1/divesites.json')
      .then(response => response.json())
      .then(data => this.setState({divesites: data}));
      // catch errors
  }

  convertToLatLng(lat, lng) {
    return new google.maps.LatLng(lat, lng);
  }

  // filters list by location and radius, creates jsx for refined list
  createSiteList() {
    const centerPoint = this.convertToLatLng(this.state.lat, this.state.lng);
    const radius = this.state.radius;

    const sites = this.state.divesites.filter(site => {
      const siteCoordinates = this.convertToLatLng(parseFloat(site.latitude), parseFloat(site.longitude));
      return google.maps.geometry.spherical.computeDistanceBetween(centerPoint, siteCoordinates) <= parseFloat(radius * 1000);
    })

    const jsxSites = sites.map(site => {
      // each li is given an event listener that needs to be bound because it is called inside of an event
      return <li onClick={this.selectedSite.bind(this)} key={site.id}>{site.name}</li>
    })

    this.setState({ reducedSites: jsxSites })
  }

  selectedSite(e) {
    e.preventDefault()
    this.setState({ selectedSite: e.target.innerText }
    e.target.style.color = 'red'
    // queryselectorAll li's, change classes and or css
  }

  handleSubmit(e) {
    e.preventDefault();
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
      });
  }

  setCSS() {
    // change css color property of selectedSite to red
    // change all other li css to black
    // then call this function inside the render function

    // OR

    // inside selectedSite, change class to 'selected' instead of changing CSS
    // ^this is probably better
    this.state.reducedSites.forEach(site => {
      if (site.name === this.state.selectedSite) {
        //
      }
    })
  }

  render() {

    let sites = this.state.reducedSites;
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
