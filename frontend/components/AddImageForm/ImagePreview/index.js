import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <img src = {imagePreview} />
      </div>
    );
  }
}
