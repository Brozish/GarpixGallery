import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';

import Loader from '../Loader';
import Image from '../Image';

class ImageList extends React.Component {
  static propTypes = {
    albumId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    images: PropTypes.array,
  };

  render() {
    const { albumId, images, loading } = this.props;

    if (loading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    return (
      <Row>
        {this.getElems(images, albumId)}
      </Row>
    );
  }

  getElems(images, albumId) {
    let preparedImages = (
      <p>No images yet</p>
    );

    if (images.length) {
      preparedImages = images.map( item => {
        return <Image key = {item.id} image = {item} albumId = {albumId} />;
      });
    }

    return (
      <ul>
        {preparedImages}
      </ul>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    images: state.albums.entities.get(ownProps.albumId).images
  };
})(ImageList);
