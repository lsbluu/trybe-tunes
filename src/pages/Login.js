import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disabled: true,
      loading: false,
      redirect: false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.cUser = this.cUser.bind(this);
  }

  handleValidate() {
    const { name } = this.state;
    const minLength = 3;
    const isMin = name.length >= minLength;

    this.setState({
      disabled: !isMin,
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState(
      {
        name: value,
      },
      this.handleValidate,
    );
  }

  async cUser() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState(
      { loading: false,
        redirect: true,
      },
    );
  }

  render() {
    const { name, disabled, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                id="name"
                data-testid="login-name-input"
                type="text"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ disabled }
              onClick={ this.cUser }
            >
              Entrar
            </button>
          </form>
        )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
