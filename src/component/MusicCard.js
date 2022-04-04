import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: [],
      loading: false,
    };
    this.addSongs = this.addSongs.bind(this);
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite() {
    getFavoriteSongs().then((fav) => {
      console.log(fav);
      this.setState(
        {
          favorite: fav,
        },
      );
    });
  }

  addSongs(id, e) {
    const { album } = this.props;
    const songsFavorite = album.find(
      (favorites) => favorites.trackId === id,
    );
    this.setState(
      {
        loading: true,
      },
    );
    if (e.target.checked) {
      addSong(songsFavorite).then(() => {
        this.setState(
          {
            loading: false,
          },
        );
      });
    } else {
      removeSong(songsFavorite).then(() => {
        console.log();
        this.setState(
          {
            loading: false,
          },
        );
      });
    }
    this.getFavorite();
  }

  render() {
    const { loading, favorite } = this.state;
    const { album } = this.props;
    return (
      <div>
        {loading ? <Loading /> : (
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
                      checked={ favorite.some((fav) => fav.trackId === music.trackId) }
                      onChange={ (e) => this.addSongs(music.trackId, e) }
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
        )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
