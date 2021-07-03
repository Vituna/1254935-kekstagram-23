import {postData} from './api.js';
import {onCloseUploadUserPhoto, onOpenUploadUserPhoto} from './image-upload.js';
import {showMessage} from './message-upload-photo.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const submitButtonNode = imageUploadForm.querySelector('#upload-submit');

const onUploadInputChange = () => {
  onOpenUploadUserPhoto();
};

const onPostDataSuccess = () => {
  onCloseUploadUserPhoto();
  showMessage('success');
};

const onPostDataError = () => {
  onCloseUploadUserPhoto();
  showMessage('error');
};

const onPostDataFinally = () => submitButtonNode.disabled = false;

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  submitButtonNode.disabled = true;
  const form = new FormData(evt.currentTarget);
  postData(onPostDataSuccess, onPostDataError, onPostDataFinally, form);
};

export {onUploadFormSubmit, onUploadInputChange};
