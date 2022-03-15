import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        {album.map((music) => (
          <ul key={ music.trackID }>
            <li>
              <p>
                {music.trackName}
              </p>

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
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
