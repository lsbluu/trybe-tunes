import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { getUser } from '../services/userAPI';
import Loading from './loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser().then((u) => {
      this.setState({ user: u,
        isLoading: false });
    });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <p>{`${user.name}`}</p>
            <p>{`${user.email}`}</p>
            <p>{`${user.description}`}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}

      </div>);
  }
}

export default Profile;
