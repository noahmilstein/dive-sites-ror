import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    getUser()
  }

  getUser() {
    fetch('/api/v1/usercontroller.json')
      .then(response => response.json())
      .then(data => this.setState({divesites: data}));
  }
}

export default NavBar;

// <% if user_signed_in? %>
//   <%= link_to "Home", dives_path %> |
//   <%= link_to "My Profile", user_path(current_user) %> |
//   <%= link_to "Sign Out", destroy_user_session_path, method: :delete %> |
//   <%= link_to "Schedule a Dive", new_dive_path %>
// <% end %>
