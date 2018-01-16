import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import { loadImage } from '../../redux/ac/images';
import ImagePreview from './ImagePreview';

class AddImageForm extends React.Component {
  static propTypes = {
    albumId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  };

  state = defaultState;

  render() {
    const { file, imagePreview } = this.state;
    const { albumId, isOpen, toggleState } = this.props;

    return (
      <Modal show = {isOpen}>
      <form onSubmit = {this.handleSubmit(file, albumId)}>
        <Modal.Header>
          <Modal.Title>Select Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange = {this.handleChange} />
          <ImagePreview imagePreview = {imagePreview} />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Upload</Button>
          <Button onClick={toggleState}>Close</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }

  handleChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = event => {
      this.setState({
        file: file,
        imagePreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit = (file, albumId) => event => {
    const { loadImage, toggleState } = this.props;

    toggleState(event);
    loadImage(file, albumId);
    this.setState(defaultState);
  };
}

const defaultState = {
  file: '',
  imagePreview: ''
};

export default connect(null, { loadImage })(AddImageForm);
