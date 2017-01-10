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
    const sites = this.state.divesites.filter(site => {
      const siteCoordinates = this.convertToLatLng(parseFloat(site.latitude), parseFloat(site.longitude));
      // console.log(parseFloat(radius * 1000));
      // console.log(this);
      // console.log(radius);
      // console.log(this.state.radius);

      return google.maps.geometry.spherical.computeDistanceBetween(centerPoint, siteCoordinates) <= parseFloat(radius * 1000);
    })
    // console.log(sites)
    sites.map(site => {
      return <li>{site.name}</li>
    })

    // jsxify(sites);
  }

  jsxify(sites) {
    // create jsx refined list
    sites.map(site => {
      return <li>{site.name}</li>
    })
  }

  handleSubmit() {
    const location = document.querySelector('.location').value;
    let radius = document.querySelector('.radius').value;
    let lat, lng;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCOq298WuE1r_3LH7fwCRW2gJGhohj2qPQ`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        debugger;
        // this is currently the problem
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
        // this.setState({
        //   lat: data.results[0].geometry.location.lat,
        //   lng: data.results[0].geometry.location.lng,
        //   radius: radius
        // })
      })
      // .then(this.createSiteList())
      this.setState({
        lat: lat,
        lng: lng,
        radius: radius
      })
      // console.log(this)
      // debugger;
    this.createSiteList()

    // const location = document.querySelector('.location').value;
    // let radius = document.querySelector('.radius').value;
    //
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCOq298WuE1r_3LH7fwCRW2gJGhohj2qPQ`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // this is currently the problem
    //     this.setState({
    //       lat: data.results[0].geometry.location.lat,
    //       lng: data.results[0].geometry.location.lng,
    //       radius: radius
    //     })
    //   })
    //   // .then(this.createSiteList())
    // this.createSiteList()
  }

  render() {
    let sites;
    // if (this.state.divesites.length > 0) {
    //   sites = this.state.divesites;
    // } else {
    //   sites = '';
    // }
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
