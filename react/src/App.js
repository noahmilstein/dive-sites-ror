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

  // this.handleValueChange = this.handleValueChange.bind(this);
  // this.handleRadiusChange = this.handleRadiusChange.bind(this);
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

  // handleValueChange(event) {
  //   this.setState({value: event.target.value});
  // }
  //
  // handleRadiusChange(event) {
  //   this.setState({radius: event.target.value});
  // }

  convertToLatLng(lat, lng) {
    return new google.maps.LatLng(lat, lng)
  }

  createSiteList() {
    const centerPoint = convertToLatLng(this.state.lat, this.state.lng)
    const sites = this.state.divesites.filter(site => {
      const lat = parseInt(site.lat);
      const lng = parseInt(site.lng);
      const siteCoordinates = convertToLatLng(lat, lng);

      return computeDistanceBetween(centerPoint, siteCoordinates) <= this.state.radius;
    })
    // sites.forEach((site) => {
    //   sites.push(<li>{site.name}</li>)
    // })
    console.log(sites);
    return sites;
  }

  handleSubmit() {
    const location = document.querySelector('.location').value;
    const radius = document.querySelector('.radius').value;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCOq298WuE1r_3LH7fwCRW2gJGhohj2qPQ`)
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
    //   const updatedSites = [];
    //   // google gives us centerpoint, we have radius
    //   // create LatLng objects of divesites
    //   // use computeDistanceBetween to create new array of divesites
    //   // with only those within the specified radius
    //   // set new divesites state
    // });
    // this.fillDropDown()
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
