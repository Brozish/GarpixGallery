import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteImage } from '../../redux/ac/images';

class Image extends React.Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    albumId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  };

  render() {
    const { image, albumId } = this.props;

    return (
      <div>
        <img src = {image.link} />
        <button onClick = {this.handleDelete(image.id, albumId)}>
          Delete
        </button>
      </div>
    );
  }

  handleDelete = (imageId, albumId) => event => {
    event.preventDefault();

    const { deleteImage } = this.props;

    deleteImage(imageId, albumId);
  }
}

export default connect(null, { deleteImage })(Image);
