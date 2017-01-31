import React from 'react';
import LocationForm from './components/LocationForm';
import ResultsList from './components/ResultsList';
import DatePickerForm from './components/DatePickerForm';
import { browserHistory } from 'react-router';
import GoogleMap from './components/GoogleMap';

class NewDive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divesites: [],
      lat: null,
      lng: null,
      radius: null,
      reducedSites: [],
      selectedSite: '',
      diveSchedule: ''
    };
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.setCSS = this.setCSS.bind(this);
    this.createSiteList = this.createSiteList.bind(this);
    this.convertToLatLng = this.convertToLatLng.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.selectedSite = this.selectedSite.bind(this);

  }
// use refs instead of query selector
// use controlled components for forms
  // https://facebook.github.io/react/docs/forms.html#controlled-components
// use hidden field instead of multi part form
// break up dives controller into multiple api controllres, 1 api end point per crud function

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

    this.setState({ reducedSites: sites }, () => {
      this.renderMap()
    })
  }

  selectedSite(e) {
    e.preventDefault()
    this.setState({ selectedSite: e.target.innerText }, this.setCSS)
  }

  setCSS() {
    const queryResults = document.querySelectorAll('.result')
    const site = this.state.selectedSite
    queryResults.forEach(result => {
      if (result.innerText === site) {
        result.classList.add('selectedSite')
      } else {
        result.classList.remove('selectedSite')
      }
    })
  }

  handleFormSubmit(e) {
    // refactor into a fetch POST promise LATER
    e.preventDefault();
    const site = this.state.selectedSite
    const date = document.querySelector("input.datetime").value
    const data = {
      site: site,
      date: date
    }
    $.ajax({
      method: 'POST',
      url: '/dives',
      data: data
    })
    browserHistory.push('/dives')
  }

  handleLocationSubmit(e) {
    e.preventDefault();

    this.setState({
      selectedSite: ''
    }, this.setCSS)

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

  submitForm() {
    browserHistory.push('/')
  }

  renderMap() {
    const map = document.querySelector('#map')
    this.map = new google.maps.Map(map, {
      center: { lat: this.state.lat, lng: this.state.lng },
      zoom: 8
    });
    const _this = this
    // why aren't all the markers showing?
    let markers = this.state.reducedSites.map(function(site) {
      return new google.maps.Marker({
        position: {lat: parseInt(site.latitude), lng: parseInt(site.longitude)},
        map: _this.map
      });
    });
    // markers.forEach(marker => marker.setMap(_this.map))
  }

  render() {
    // instead use display:hidden; then toggle display
    // use JS to transition div
    let queryOutput;
    if (this.state.radius !== null) {
      queryOutput = <div id="resultsList">
        <ResultsList
          data={this.state.reducedSites}
          clickHandler={this.selectedSite}
        />
      </div>;
    }

    // instead use display:hidden; then toggle display
    // use JS to transition div
    let datePickerForm;
    if (this.state.selectedSite !== '') {
      datePickerForm = <DatePickerForm data={this.handleFormSubmit}/>
    }

    return (
      <div>
        <LocationForm
          data={this.handleLocationSubmit}
        />
        {queryOutput}
        <GoogleMap
          radius={this.state.radius}
        />
        {datePickerForm}
      </div>
    );
  }
};

export default NewDive;
