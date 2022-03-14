import React, { Component } from 'react';
import Loading from '../pages/loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
    this.gUser = this.gUser.bind(this);
  }

  componentDidMount() {
    this.gUser();
  }

  async gUser() {
    this.setState({
      loading: true,
    });

    const userName = await getUser();
    this.setState({
      name: userName.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {loading ? <Loading /> : (name)}
        </p>
      </header>
    );
  }
}

export default Header;
