import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import AddImageForm from '../components/AddImageForm';

export default OriginalComponent => class ShowModal extends React.Component {
  state = {
    isOpen: false
  }

  render() {
    return (
      <div>
        <OriginalComponent {...this.props} {...this.state} toggleState = {this.toggleState} />
        <AddImageForm {...this.props} {...this.state} toggleState = {this.toggleState} />
      </div>
    )
  }

  toggleState = event => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}
