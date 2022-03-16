import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../component/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: [],
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchSongById();
  }

  fetchSongById = async () => {
    const {
      match: {
        params: {
          id },
      },
    } = this.props;
    const Resultsong = await getMusics(id);
    this.setState({
      album: Resultsong[0],
      musics: Resultsong.slice(1),
    });
  }

  render() {
    const { album, musics } = this.state;
    const { artistName, collectionName, artworkUrl100 } = album;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{collectionName}</h2>
        <img src={ artworkUrl100 } alt={ artistName } />
        <MusicCard album={ musics } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
