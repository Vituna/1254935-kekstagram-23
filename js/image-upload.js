import {isEscEvent} from './utils.js';
import {onHashtagInput} from './photo-hashtag.js';
import {setDefaultScale, onMinusButtonClick, onPlusButtonClick} from './scale.js';
import {onEffectsInit, onEffectsDestroy} from './effects.js';
import {postData} from './api.js';
import {showMessage} from './message-upload-photo.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const imageUploadForm = body.querySelector('.img-upload__form');
const userUploadPhoto = imageUploadForm.querySelector('.img-upload__overlay');
const scaleControlSmaller = userUploadPhoto.querySelector('.scale__control--smaller');
const scaleControlBigger = userUploadPhoto.querySelector('.scale__control--bigger');
const imageUploadPreview = userUploadPhoto.querySelector('.img-upload__preview');
const img = imageUploadPreview.querySelector('img');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputComment = imageUploadForm.querySelector('.text__description');
const onUploadInputChange = imageUploadForm.querySelector('.img-upload__input');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const closeUploadFile = imageUploadForm.querySelector('#upload-cancel');
const submitButtonNode = imageUploadForm.querySelector('#upload-submit');

const isInputInFocus = () => document.activeElement === inputHashtag || document.activeElement === inputComment;

const onPostDataSuccess = () => {
  onUserPhotoClose();
  showMessage('success');
};

const onPostDataError = () => {
  onUserPhotoClose();
  showMessage('error');
};

const onPostDataFinally = () => submitButtonNode.disabled = false;

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  submitButtonNode.disabled = true;
  const form = new FormData(evt.currentTarget);
  postData(onPostDataSuccess, onPostDataError, onPostDataFinally, form);
};

const getDownloadPhoto = () => {
  const file = onUploadInputChange.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      img.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt) && !isInputInFocus()) {
    evt.preventDefault();
    onUserPhotoClose();
  }
};

const onUserPhotoUpload = () => {
  onEffectsInit();
  setDefaultScale();
  body.classList.add('modal-open');
  userUploadPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  imageUploadForm.removeEventListener('change', onUserPhotoUpload);
  closeUploadFile.addEventListener('click', onUserPhotoClose);
  inputHashtag.addEventListener('input', onHashtagInput);
  scaleControlSmaller.addEventListener('click', onMinusButtonClick);
  scaleControlBigger.addEventListener('click', onPlusButtonClick);
  imageUploadForm.addEventListener('submit', onUploadFormSubmit);
};

function onUserPhotoClose () {
  onEffectsDestroy();
  imageUploadForm.reset();
  body.classList.remove('modal-open');
  userUploadPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  imageUploadForm.addEventListener('change', onUserPhotoUpload);
  closeUploadFile.removeEventListener('click', onUserPhotoClose);
  inputHashtag.removeEventListener('input', onHashtagInput);
  scaleControlSmaller.removeEventListener('click', onMinusButtonClick);
  scaleControlBigger.removeEventListener('click', onPlusButtonClick);
  imageUploadForm.removeEventListener('submit', onUploadFormSubmit);
}

uploadFile.addEventListener('change', onUserPhotoUpload);
onUploadInputChange.addEventListener('change', getDownloadPhoto);

export {onUserPhotoClose, onUserPhotoUpload};
