import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loadAlbums, addAlbum } from '../../redux/ac/albums';
import Loader from '../Loader';
import AddAlbumForm from '../AddAlbumForm';

class AlbumList extends React.Component {
  static propTypes = {
    albums: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  componentDidMount() {
    const { loadAlbums, loading, loaded } = this.props;

    if (!loading && !loaded) loadAlbums();
  }

  render() {
    const { albums, loading, addAlbum } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <ul>
          {this.getElems(albums)}
        </ul>
        <AddAlbumForm />
      </div>
    );
  }

  getElems(albums) {
    if (!albums.length) {
      return <p>No albums yet</p>;
    }

    return albums.map( item => {
      const { id, title } = item;

      return (
        <li key = {id}>
          <NavLink to = {`/albums/${id}`} activeClassName = "nav-link-selected">
            {title}
          </NavLink>
        </li>
      );
    });
  }
}

export default connect(state => {
  return {
    albums: state.albums.entities.toArray(),
    loading: state.albums.loading,
    loaded: state.albums.loaded
  };
}, { loadAlbums, addAlbum })(AlbumList)
