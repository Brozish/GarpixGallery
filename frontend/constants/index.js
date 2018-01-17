export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

export const LOAD_ALBUMS = 'LOAD_ALBUMS';
export const DELETE_ALBUM = 'DELETE_ALBUM';

export const LOAD_IMAGE = 'LOAD_IMAGE';

export const CLIENT_ID = '3e8cfcd2ff3a19b';

export const REQUIRED = attribute => `The ${attribute} field is required.`;
export const MAX_LENGTH = (attribute, max) => `The ${attribute} may not be greater than ${max} characters.`;
export const TYPE_IMAGE = `The file must be an image.`;
export const FILE_SIZE = max => `The file may not be greater than ${max} kilobytes.`;

export const ALBUM_NAME_LENGTH = 10;
export const FILE_SIZE_MAX = 10 * 1000 * 1000;
