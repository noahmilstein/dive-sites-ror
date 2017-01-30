import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
    this.setState = this.setState.bind(this);
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
      this.setState({ currentUser: data.currentUser });
    });
  }

  render() {
    let nav;
    if (this.state.currentUser !== null) {
      nav = <ul>
              <li><Link to={"/"}>Home</Link></li>
              <li>About</li>
              <li><Link to="/users">My Profile</Link></li>
              <li><a href="/users/sign_out">Sign Out</a></li>
              <li><Link to={"/dives/new"}>Schedule a Dive</Link></li>
            </ul>;
    } else {
      nav = <ul>
              <li><a href="/users/sign_in">Sign In</a></li>
              <li><a href="/users/sign_up">Sign Up</a></li>
              <li>About</li>
            </ul>;
    }

    return (
      <div>
        <div>
          {nav}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default NavBar;
