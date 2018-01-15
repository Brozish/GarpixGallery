import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div>
        {this.getElems(images)}
      </div>
    );
  }

  getElems(images) {
    let preparedImages = (
      <p>No images yet</p>
    );

    if (images.length) {
      preparedImages = images.map( item => {
        return <li key = {item.id}><Image image = {item} /></li>;
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
