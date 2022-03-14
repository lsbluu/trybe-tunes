import React, { Component } from 'react';
import Header from '../component/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleValidate() {
    const { name } = this.state;
    const minLength = 2;
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

  render() {
    const { name, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <label htmlFor="name">
            <input
              id="name"
              data-testid="search-artist-input"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </form>

      </div>
    );
  }
}

export default Search;
