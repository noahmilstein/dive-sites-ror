import React from 'react';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    divesites: [],
    value: '',
    radius: 0,
    lat: 0.0,
    lng: 0.0
  };

  this.handleValueChange = this.handleValueChange.bind(this);
  this.handleRadiusChange = this.handleRadiusChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount() {
    this.setInitialState()
  }

  // populates divesites dropdown menu
  setInitialState() {
    $.ajax({
      method: 'GET',
      url: '/api/v1/divesites.json'
    })
    .done(data => {
      this.setState({divesites: data})
    });
  }

  handleValueChange(event) {
    this.setState({value: event.target.value});
  }

  handleRadiusChange(event) {
    this.setState({radius: event.target.value});
  }

  fillDropdown() {
    let options = [];
    this.state.divesites.forEach((site) => {
      options.push(`<option>${site.name}</option>`)
    })
    options = options.join('');
    console.log(options);
    return options;
  }

  handleSubmit(event) {
    const location = this.state.value;
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GEOCODE_API_KEY}`
    })
    .done(data => {
      this.setState({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      });
      const updatedSites = [];
      // google gives us centerpoint, we have radius
      // create LatLng objects of divesites
      // use computeDistanceBetween to create new array of divesites
      // with only those within the specified radius
      // set new divesites state
    });
    this.fillDropDown()
    alert(`A name was submitted: ${location}`);
  }

  render() {
    const options = this.fillDropdown();
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input type="text" value={this.state.value} onChange={this.handleValueChange} />
        </label>
        <label>
          <input type="number" value={this.state.radius} onChange={this.handleRadiusChange} min="1" />
        </label>
        <select>
          {options}
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

export default App;
