import React from 'react';
import DiveList from '../homePage/components/DiveList';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      archivedDives: [],
      activeDives: []
    };
    this.setState = this.setState.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    $.ajax({
      url: '/',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ currentUser: data.currentUser }, this.getUserDives);
    });
  }

  getUserDives() {
    $.ajax({
      url: `/users/${this.state.currentUser.id}`,
      contentType: 'application/json'
    }).done(data => {
      this.setState({ activeDives: data.activeDives, archivedDives: data.archivedDives })
    });
  }

  render() {
    return (
      <div>
        <div>Upcoming Dives:
          <DiveList
            data={this.state.activeDives}
          />
        </div>
        <div>Archived Dives:
          <DiveList
            data={this.state.archivedDives}
          />
        </div>
      </div>
    )
  }
}

export default UserPage;
