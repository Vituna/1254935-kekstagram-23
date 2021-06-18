import {isEscEvent} from './utils.js';

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    body.classList.remove('modal-open');
  }
};

const closeBigFoto = () =>{
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

closeButton.addEventListener('click', () => {
  closeBigFoto();
});

export {onPopupEscKeydown};
