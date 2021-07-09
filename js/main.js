import './image-upload.js';
import {ERROR_SERVER} from './utils.js';
import {getData} from './api.js';
import {renderMiniPhotos} from './rendering-thumbnails.js';
import {onAddPhotoListClick} from './big-picture.js';
import {showAlert} from './alert.js';
import {onPhotoFilterRender} from './filter.js';

const onGetDataSuccess = (photos) => {
  renderMiniPhotos(photos);
  onAddPhotoListClick(photos);
  onPhotoFilterRender(photos);
};

const onGetDataError = () => showAlert(ERROR_SERVER);

getData(onGetDataSuccess, onGetDataError);
