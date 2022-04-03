import React, { Component } from 'react';
import Header from '../component/Header';
import Loading from './loading';
import MusicCard from '../component/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((album) => {
      this.setState({ album, isLoading: false });
    });
  }

  render() {
    const { album, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Loading /> : (
          <MusicCard
            album={ album }
          />
        )}

      </div>
    );
  }
}

export default Favorites;
