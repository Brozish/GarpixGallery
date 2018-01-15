import {
  START, SUCCESS,
  LOAD_ALBUMS, DELETE_ALBUM
} from '../../constants';

export function loadAlbums() {
  return dispatch => {
    dispatch({
        type: LOAD_ALBUMS + START
    });

    let albums = JSON.parse(localStorage.getItem('albums'));

    if (!albums) {
      albums = [];
      localStorage.setItem('albums', JSON.stringify(albums));
    }

    dispatch({
        type: LOAD_ALBUMS + SUCCESS,
        payload: {
          albums
        }
    });
  };
}

export function addAlbum(title) {
  return dispatch => {
    let albums = JSON.parse(localStorage.getItem('albums'));
    let id = Date.now().toString(36).substr(2);

    albums.push({ id, title });
    localStorage.setItem('albums', JSON.stringify(albums));
    dispatch( loadAlbums() );
  }
}

export function deleteAlbum(albumId) {
  return dispatch => {
    let albums = JSON.parse(localStorage.getItem('albums'));

    localStorage.setItem('albums', JSON.stringify(albums.filter(item => {
      return item.id != albumId;
    })));

    dispatch({
        type: DELETE_ALBUM,
        payload: {
          albumId
        }
    });
  }
}
