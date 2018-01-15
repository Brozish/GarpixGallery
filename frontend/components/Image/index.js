import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  static propTypes = {
    image: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <img src = {this.props.image.link} />
      </div>
    );
  }
}

export default Image;
