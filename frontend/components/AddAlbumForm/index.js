import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Row from 'react-bootstrap/lib/Row';

import { addAlbum } from 'Redux/ac/albums';
import { REQUIRED, MAX_LENGTH, ALBUM_NAME_LENGTH } from 'constants';

class AddAlbumForm extends React.Component {
  render() {
    const { handleSubmit, addAlbum, reset } = this.props;

    return (
        <Form onSubmit = {handleSubmit(this.handleSubmit(addAlbum, reset))} horizontal>
          <Row>
            <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={6} smOffset={3} xs={10} xsOffset={1}>
              <Field
                type = "text"
                name = "album name"
                component = {fieldInput}
                validate={[required, maxLength]}
              />
            </Col>
            <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={6} smOffset={3} xs={10} xsOffset={1}>
              <FormGroup>
                <Button type="submit" bsStyle="primary" block>Add Album</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
    );
  }

  handleSubmit = (addAlbum, reset) => (values, ...test) => {
    reset();
    addAlbum(values['album name']);
  }
}

const fieldInput = ({input, meta}) => (
  <FormGroup validationState = {meta.touched && meta.error ? 'error' : null}>
    <ControlLabel>
      Album Name
    </ControlLabel>
    <FormControl type="text" {...input} />
    { meta.touched && meta.error && (
      <HelpBlock>{meta.error}</HelpBlock>
    )}
  </FormGroup>
);

const required = (value, allValues, props, name) => {
  if (!value) {
    return REQUIRED(name);
  }

  return null;
};

const maxLength = (value, allValues, props, name) => {
  if (value && value.length > ALBUM_NAME_LENGTH) {
    return MAX_LENGTH(name, ALBUM_NAME_LENGTH);
  }

  return null;
};

export default reduxForm({
  form: 'add-album-form'
})(connect(null, { addAlbum })(AddAlbumForm));
