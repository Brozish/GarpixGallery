import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import { loadAlbums, addAlbum } from '../../redux/ac/albums';
import Loader from '../Loader';
import AddAlbumForm from '../AddAlbumForm';

class AlbumList extends React.Component {
  static propTypes = {
    albums: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  componentDidMount() {
    const { loadAlbums, loading, loaded } = this.props;

    if (!loading && !loaded) loadAlbums();
  }

  render() {
    const { albums, loading, addAlbum } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Albums
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <ListGroup>
            <ListGroupItem>
              <ul>
                {this.getElems(albums)}
              </ul>
            </ListGroupItem>
            <ListGroupItem>
              <AddAlbumForm />
            </ListGroupItem>
          </ListGroup>
        </Panel.Body>
      </Panel>
    );
  }

  getElems(albums) {
    if (!albums.length) {
      return <p>No albums yet</p>;
    }

    return albums.map( item => {
      const { id, title } = item;

      return (
        <li key = {id}>
          <NavLink to = {`/albums/${id}`} activeClassName = "nav-link-selected">
            {title}
          </NavLink>
        </li>
      );
    });
  }
}

export default connect(state => {
  return {
    albums: state.albums.entities.toArray(),
    loading: state.albums.loading,
    loaded: state.albums.loaded
  };
}, { loadAlbums, addAlbum })(AlbumList)
