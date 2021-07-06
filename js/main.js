import './image-upload.js';
import {getData} from './api.js';
import {renderMiniPhotos} from './rendering-thumbnails.js';
import {addPhotoListClickHandler} from './big-picture.js';
import {showAlert} from './alert.js';

const onGetDataSuccess = (photos) => {
  renderMiniPhotos(photos);
  addPhotoListClickHandler(photos);
};

const onGetDataError = () => showAlert('Сервер Глюканул :)');

getData(onGetDataSuccess, onGetDataError);
