import React from 'react';
import DiveList from './DiveList';

class DivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divesites: []
    };
  }

  componentDidMount() {
    getSites()
  }

  getSites() {
    fetch('/api/v1/dives.json')
      .then(response => response.json())
      .then(data => this.setState({divesites: data}));
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
