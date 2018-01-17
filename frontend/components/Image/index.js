import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import BsImage from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Clearfix from 'react-bootstrap/lib/Clearfix';

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
      <Col lg={4} md={4} sm={6} xs={10}>
        <div className = "img-container">
          <BsImage src = {image.link} thumbnail />
        </div>
        <Clearfix />
        <Button onClick = {this.handleDelete(image.id, albumId)} block>
          Delete
        </Button>
      </Col>
    );
  }

  handleDelete = (imageId, albumId) => event => {
    event.preventDefault();

    const { deleteImage } = this.props;

    deleteImage(imageId, albumId);
  }
}

export default connect(null, { deleteImage })(Image);
