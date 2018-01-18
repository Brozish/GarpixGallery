import {
  START, SUCCESS, FAIL,
  LOAD_IMAGE,
  CLIENT_ID
} from 'constants';
import { loadAlbums } from './albums';

export function loadImage(file, albumId) {
  return dispatch => {
    dispatch({
        type: LOAD_IMAGE + START
    });

    let headers = new Headers();

    headers.append('Authorization', 'Client-ID ' + CLIENT_ID);

    let formData = new FormData();

    formData.append('image', file);

    fetch(`https://api.imgur.com/3/image`, {
      method: 'POST',
      headers: headers,
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      let albums = JSON.parse(localStorage.getItem('albums'));

      localStorage.setItem('albums', JSON.stringify(albums.map(item => {
        if (item.id == albumId) {
          const { id, link, deletehash } = response.data;

          item.images.push({ id, link, deletehash });
        }

        return item;
      })));
      dispatch( loadAlbums() );
    })
    .catch(error => dispatch({
      type: LOAD_IMAGE + FAIL,
      error
    }));

  };
}

export function deleteImage(imageId, albumId) {
  return dispatch => {
    let albums = JSON.parse(localStorage.getItem('albums'));

    localStorage.setItem('albums', JSON.stringify(albums.map(item => {
      if (item.id == albumId) {
        item.images = item.images.filter(item => {
          return item.id != imageId;
        });
      }

      return item;
    })));

    dispatch( loadAlbums() );
  }
}
