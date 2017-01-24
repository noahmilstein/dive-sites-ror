import React from 'react';
import DiveList from './DiveList';

class DivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divesites: []
    };
    this.setState = this.setState.bind(this);
    this.getSites = this.getSites.bind(this);
  }

  componentDidMount() {
    this.getSites()
  }

  getSites() {
    $.ajax({
      url: '/',
      contentType: 'application/json'
    }).done(data => {
      console.log(data)
      this.setState({ divesites: data.dives });
    });
  }

  render() {
    return (
      <DiveList
        data={this.state.divesites}
      />
    )
  }
}

export default DivePage;
