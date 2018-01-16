import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

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
    const { albumId, isOpen } = this.props;

    return (
      <Modal show = {isOpen}>
        <form onSubmit = {this.handleSubmit(file, albumId)}>
          <div>
            <label>Select Image</label>
            <input type="file" onChange = { this.handleChange } />
          </div>
          <button type="submit">Add Image</button>
        </form>
        <ImagePreview imagePreview = {imagePreview} />
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
