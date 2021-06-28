import {isEscEvent} from './utils.js';
import {onHashtagInput} from './photo-hashtag.js';

const body = document.querySelector('body');
const imageUploadForm = body.querySelector('.img-upload__form');
const userUploadPhoto = imageUploadForm.querySelector('.img-upload__overlay');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const closeUploadFile = imageUploadForm.querySelector('#upload-cancel');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputComment = imageUploadForm.querySelector('.text__description');

const getCatchesFocus = () => document.activeElement === inputHashtag || document.activeElement === inputComment;

const toggleModal = () => {
  userUploadPhoto.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const onCloseUploadUserPhoto = () => {
  toggleModal();
  closeUploadFile.removeEventListener('click', onCloseUploadUserPhoto);
  inputHashtag.removeEventListener('input', onHashtagInput);
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
};

uploadFile.addEventListener('change', onOpenUploadUserPhoto);
