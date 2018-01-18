import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { loadImage } from 'Redux/ac/images';
import ImagePreview from 'Components/ImagePreview';
import { FILE_SIZE, FILE_SIZE_MAX, TYPE_IMAGE } from 'constants';

class AddImageForm extends React.Component {
  static propTypes = {
    albumId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  };

  state = {
    ...defaultState,
    ...defaultValidation
  };

  render() {
    const { file, imagePreview } = this.state;
    const { albumId, isOpen, toggleState, loadImage } = this.props;

    return (
      <Modal show = {isOpen}>
      <form onSubmit = {this.handleSubmit(file, albumId, toggleState, loadImage)}>
        <Modal.Header>
          <Modal.Title>Select Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup validationState = {this.getValidationState() ? 'error' : null}>
            <Button className="btn-file center-block" bsStyle = {this.getValidationState() ? 'danger' : null}>
              Browse<input type="file" onChange = {this.handleChange} />
            </Button>
            <HelpBlock className = "text-center">{this.getValidationState()}</HelpBlock>
          </FormGroup>
          <ImagePreview imagePreview = {imagePreview} />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Upload</Button>
          <Button onClick={this.handleClose(toggleState)}>Close</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }

  handleClose = toggleState => event => {
    this.setState({
      ...defaultState,
      ...defaultValidation
    });
    toggleState(event);
  }

  getValidationState() {
    const { validationFileInputSize, validationFileInputType } = this.state;

    return validationFileInputSize || validationFileInputType;
  }

  handleChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    if (file.size >= FILE_SIZE_MAX) {
      this.setState({
        ...defaultState,
        validationFileInputSize: FILE_SIZE(FILE_SIZE_MAX / 1000),
        validationFileInputType: null
      });

      return;
    }

    if (file.type.search(/image/i)) {
      this.setState({
        ...defaultState,
        validationFileInputSize: null,
        validationFileInputType: TYPE_IMAGE,

      });

      return;
    }

    reader.onloadend = event => {
      this.setState({
        file: file,
        imagePreview: reader.result,
        ...defaultValidation
      });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit = (file, albumId, toggleState, loadImage) => event => {
    toggleState(event);
    loadImage(file, albumId);
    this.setState({
      ...defaultState,
      ...defaultValidation
    });
  };
}

const defaultState = {
  file: '',
  imagePreview: ''
};

const defaultValidation = {
  validationFileInputSize: null,
  validationFileInputType: null
};

export default connect(null, { loadImage })(AddImageForm);
