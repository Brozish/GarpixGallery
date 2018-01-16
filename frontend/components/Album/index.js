import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import ImageList from '../ImageList';
import { deleteAlbum } from '../../redux/ac/albums';
import showModal from '../../decorator/showModal';

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
    const { album, toggleState } = this.props;

    if (!album) {
      return null;
    }

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            {album.title}
            <Button onClick = {this.handleDelete(album.id)} className = "pull-right" bsSize="xsmall">
              Delete
            </Button>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {this.getImages(album.id)}
        </Panel.Body>
        <Panel.Footer>
          <Button onClick = {toggleState}>
            Upload Image
          </Button>
        </Panel.Footer>
      </Panel>
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
}, { deleteAlbum })(showModal(Album));
