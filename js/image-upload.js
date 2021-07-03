import {isEscEvent} from './utils.js';
import {onHashtagInput} from './photo-hashtag.js';
import {setDefaultScale, onMinusButtonClick, onPlusButtonClick} from './scale.js';
import {initEffects, destroyEffects} from './effects.js';
import {onUploadFormSubmit, onUploadInputChange} from './post.js';

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
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const closeUploadFile = imageUploadForm.querySelector('#upload-cancel');

const getCatchesFocus = () => document.activeElement === inputHashtag || document.activeElement === inputComment;

const toggleModal = () => {
  body.classList.toggle('modal-open');
};

const getDownloadPhoto = () => {
  const file = imageUploadInput.files[0];
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

const onCloseUploadUserPhoto = () => {
  toggleModal();
  setDefaultScale();
  destroyEffects();
  userUploadPhoto.classList.add('hidden');
  imageUploadForm.addEventListener('change', onUploadInputChange);
  closeUploadFile.removeEventListener('click', onCloseUploadUserPhoto);
  inputHashtag.removeEventListener('input', onHashtagInput);
  scaleControlSmaller.removeEventListener('click', onMinusButtonClick);
  scaleControlBigger.removeEventListener('click', onPlusButtonClick);
  imageUploadForm.removeEventListener('submit', onUploadFormSubmit);
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
  initEffects();
  userUploadPhoto.classList.remove('hidden');
  imageUploadForm.removeEventListener('change', onUploadInputChange);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeUploadFile.addEventListener('click', onCloseUploadUserPhoto);
  inputHashtag.addEventListener('input', onHashtagInput);
  scaleControlSmaller.addEventListener('click', onMinusButtonClick);
  scaleControlBigger.addEventListener('click', onPlusButtonClick);
  imageUploadForm.addEventListener('submit', onUploadFormSubmit);
};

uploadFile.addEventListener('change', onOpenUploadUserPhoto);
imageUploadInput.addEventListener('change', getDownloadPhoto);

export {onCloseUploadUserPhoto, onOpenUploadUserPhoto};
