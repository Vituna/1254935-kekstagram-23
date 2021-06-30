import {isEscEvent} from './utils.js';
import {onHashtagInput} from './photo-hashtag.js';
import {setDefaultScale, onMinusButtonClick, onPlusButtonClick} from './scale.js';
import {onNoneEffectClick} from './effects.js';

const body = document.querySelector('body');
const imageUploadForm = body.querySelector('.img-upload__form');
const userUploadPhoto = imageUploadForm.querySelector('.img-upload__overlay');
const scaleControlSmaller = userUploadPhoto.querySelector('.scale__control--smaller');
const scaleControlBigger = userUploadPhoto.querySelector('.scale__control--bigger');
const imageUploadPreview = userUploadPhoto.querySelector('.img-upload__preview');
const img = imageUploadPreview.querySelector('img');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputComment = imageUploadForm.querySelector('.text__description');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const closeUploadFile = imageUploadForm.querySelector('#upload-cancel');

const getCatchesFocus = () => document.activeElement === inputHashtag || document.activeElement === inputComment;

const toggleModal = () => {
  userUploadPhoto.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const getDownloadPhoto = () => {
  img.src = URL.createObjectURL(imageUploadInput.files[0]);
};

const onCloseUploadUserPhoto = () => {
  toggleModal();
  setDefaultScale();
  onNoneEffectClick();
  closeUploadFile.removeEventListener('click', onCloseUploadUserPhoto);
  inputHashtag.removeEventListener('input', onHashtagInput);
  scaleControlSmaller.removeEventListener('click', onMinusButtonClick);
  scaleControlBigger.removeEventListener('click', onPlusButtonClick);

};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt) && !getCatchesFocus()) {
    evt.preventDefault();
    imageUploadForm.reset();
    document.removeEventListener('keydown', onPopupEscKeydown);
    onCloseUploadUserPhoto();
  }
};

const onOpenUploadUserPhoto = () => {
  toggleModal();
  document.addEventListener('keydown', onPopupEscKeydown);
  closeUploadFile.addEventListener('click', onCloseUploadUserPhoto);
  inputHashtag.addEventListener('input', onHashtagInput);
  scaleControlSmaller.addEventListener('click', onMinusButtonClick);
  scaleControlBigger.addEventListener('click', onPlusButtonClick);
};

uploadFile.addEventListener('change', onOpenUploadUserPhoto);
imageUploadInput.addEventListener('change', getDownloadPhoto);
