import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux';

import { redirectHome } from '../../../redux/ac/redirect';

class NotFound extends React.Component {
  render() {
    return (
      <Jumbotron className = "text-center">
      <Row>
        <h3>
          404 Page Not Found
        </h3>
        <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={6} smOffset={3} xs={10} xsOffset={1}>
          <Button type="button" bsStyle="primary" block onClick = {this.handleClick}>Home</Button>
        </Col>
      </Row>
      </Jumbotron>
    );
  }

  handleClick = event => {
    event.preventDefault();

    const { redirectHome } = this.props;

    redirectHome();
  }
}


export default connect(null, { redirectHome })(NotFound);
