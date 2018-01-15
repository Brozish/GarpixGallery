import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { addAlbum } from '../../redux/ac/albums';

class AddAlbumForm extends React.Component {
  render() {
    const { handleSubmit, addAlbum, reset } = this.props;

    return (
      <form onSubmit = {handleSubmit(this.handleSubmit(addAlbum, reset))}>
        <div>
          <label>Album Name</label>
          <Field type = "text" name = "album-title" component = "input" />
        </div>
        <button type="submit">Add Album</button>
      </form>
    );
  }

  handleSubmit = (addAlbum, reset) => values => {
    reset();
    addAlbum(values['album-title']);
  }
}

export default reduxForm({
  form: 'add-album-form'
})(connect(null, { addAlbum })(AddAlbumForm));
