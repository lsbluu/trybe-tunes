import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './loading';

// searchAlbumsAPI('beatles').then((artista) => console.log(artista));

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      resultBusca: '',
      loading: false,
      albums: [],
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);
  }

  // Controla input e valida
  handleChange({ target: { value } }) {
    const minLength = 2;
    const isMin = value.length >= minLength;
    console.log(isMin);
    this.setState(
      {
        artista: value,
        resultBusca: value,
        disabled: !isMin,
      },
    );
  }

  searchAlbum = async () => {
    const { artista } = this.state;
    this.setState(
      {
        loading: true,
      },
    );

    const resultAlbum = await searchAlbumsAPI(artista);
    console.log(resultAlbum);
    this.setState(
      {
        artista: '',
        loading: false,
        albums: resultAlbum,
      },
    );
  }

  render() {
    const { disabled, artista, resultBusca, loading, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="name">
                <input
                  id="name"
                  data-testid="search-artist-input"
                  type="text"
                  value={ artista }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ disabled }
                onClick={ this.searchAlbum }
              >
                Pesquisar
              </button>
            </form>
          ) }
        <section>
          <div>
            {albums.length === 0
              ? 'Nenhum álbum foi encontrado'
              : `Resultado de álbuns de: ${resultBusca}`}
          </div>
          <div>
            {albums.map((album) => (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
              >
                <div>
                  <img src={ album.artworkUrl100 } alt={ album.artistName } />
                  <p>
                    {album.collectionName}
                  </p>
                  <p>
                    {album.artistName}
                  </p>
                </div>
              </Link>

            ))}

          </div>
        </section>
      </div>
    );
  }
}

export default Search;
