import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageList from '../ImageList';
import { deleteAlbum } from '../../redux/ac/albums';

class Album extends React.Component {
  static propTypes = {
    albumId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    album: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  };

  render() {
    const { album } = this.props;

    if (!album) {
      return null;
    }

    return (
      <div>
        {this.getImages(album.id)}
        <button onClick = {this.handleDelete(album.id)}>
          Delete
        </button>
      </div>
    );
  }

  handleDelete = albumId => event => {
    event.preventDefault();

    const { deleteAlbum } = this.props;

    deleteAlbum(albumId);
  }

  getImages(albumId) {
    return <ImageList albumId = {albumId} />;
  }
}

export default connect((state, ownProps) => {
  return {
    album: state.albums.entities.get(ownProps.albumId)
  };
}, { deleteAlbum })(Album);
