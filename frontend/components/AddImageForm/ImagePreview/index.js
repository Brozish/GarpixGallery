import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/lib/Image';

export default class ImagePreview extends React.Component {
  static propTypes = {
    imagePreview: PropTypes.string.isRequired
  };

  render() {
    const { imagePreview } = this.props;

    if(!imagePreview) {
      return null;
    }

    return (
      <Image src = {imagePreview} rounded className = "center-block" />
    );
  }
}
