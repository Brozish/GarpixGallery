import {
  START, SUCCESS,
  LOAD_ALBUMS, DELETE_ALBUM
} from '../../constants';
import { OrderedMap, Record } from 'immutable';

const AlbumRecord = Record({
  id: null,
  title: null
});

const defaultStateRecord = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap({})
});

const defaultState = new defaultStateRecord();

export default (albumsState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALBUMS + START:
      return albumsState.set('loading', true);
      break;
    case LOAD_ALBUMS + SUCCESS:
      return payload.albums.reduce((previousState, item) => {
        return previousState.setIn(['entities', item.id], new AlbumRecord(item));
      }, albumsState).set('loading', false).set('loaded', true);
      break;
    case DELETE_ALBUM:
      return albumsState.deleteIn(['entities', payload.albumId]);
      break;
    default:
      return albumsState;
  }
}
