import './image-upload.js';
import {ERROR_SERVER_MESSAGE} from './utils.js';
import {getData} from './api.js';
import {renderMiniPhotos} from './rendering-thumbnails.js';
import {onAddPhotoListClick} from './big-picture.js';
import {showAlert} from './utils.js';
import {onPhotoFilterRender} from './filter.js';

const onGetDataError = () => showAlert(ERROR_SERVER_MESSAGE);

const onGetDataSuccess = (photos) => {
  renderMiniPhotos(photos);
  onAddPhotoListClick(photos);
  onPhotoFilterRender(photos);
};

getData(onGetDataSuccess, onGetDataError);
