import React from 'react';
import { Route } from 'react-router-dom';

import AlbumList from 'Components/AlbumList';
import Album from 'Components/Album';

export default class AlbumListHandle extends React.Component {
  render() {
    return (
      <div>
        <AlbumList />
        <Route path = '/albums/:id' children = {this.getAlbum} />
      </div>
    );
  }

  getAlbum = ({ match }) => {
    if (!match) return null;

    const { id } = match.params;

    return <Album albumId = {id} key = {id} />;
  }
}
