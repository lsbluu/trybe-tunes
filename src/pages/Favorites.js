import React, { Component } from 'react';
import Header from '../component/Header';
import Loading from './loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite() {
    this.setState({ isLoading: true });
    getFavoriteSongs().then((album) => {
      this.setState({ album, isLoading: false });
    });
  }

  removeSong(id) {
    const { album } = this.state;
    const songsFavorite = album.find(
      (favorites) => favorites.trackId === id,
    );
    this.setState(
      {
        isLoading: true,
      },
    );

    removeSong(songsFavorite).then(() => {
      console.log();
      this.setState(
        {
          isLoading: false,
        },
      );
    });

    this.getFavorite();
  }

  render() {
    const { album, isLoading } = this.state;
    return (
      <>
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <div data-testid="page-favorites">Musicas Favoritas</div>
            <div>
              {album.map((music) => (
                <ul key={ music.trackId }>
                  <li>
                    <p>
                      {music.trackName}
                    </p>
                    <label key={ music.trackId } htmlFor={ music.trackId }>
                      Favorita
                      <input
                        id={ music.trackId }
                        name={ music.trackId }
                        data-testid={ `checkbox-music-${music.trackId}` }
                        type="checkbox"
                        checked={ album.some((fav) => fav.trackId === music.trackId) }
                        onChange={ () => this.removeSong(music.trackId) }
                      />
                    </label>
                    <div>
                      <audio
                        data-testid="audio-component"
                        src={ music.previewUrl }
                        controls
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        <code>audio</code>
                        .
                      </audio>
                    </div>

                  </li>
                </ul>

              ))}
            </div>
          </>
        )}

      </>);
  }
}

export default Favorites;
