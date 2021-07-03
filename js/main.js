import './image-upload.js';
import {getData} from './api.js';
import {renderMiniPhotos} from './rendering-thumbnails.js';
import {addPhotoListClickHandler} from './big-picture.js';
import {showAlert} from './alert.js';

const onGetDataSuccess = (photo) => {
  renderMiniPhotos(photo);
  addPhotoListClickHandler(photo);
};

const onGetDataError = () => showAlert('Сервер Глюканул :)');

getData(onGetDataSuccess, onGetDataError);
