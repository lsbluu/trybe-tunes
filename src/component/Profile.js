import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from '../pages/loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    getUser().then((userr) => {
      this.setState({ user: userr });
    });
    console.log(user);
  }

  render() {
    const { user } = this.state;
    return (
      <div>Es</div>
    );
  }
}

export default Profile;
