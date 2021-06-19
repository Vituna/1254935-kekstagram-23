import {userPhotos} from './data.js';
import {isEscEvent} from './utils.js';

const AVATAR_SIZE = 35;

const body = document.querySelector('body');
const photoList = body.querySelectorAll('.picture');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentFragment = document.createDocumentFragment();

const tooglePreview = () => {
  bigPicture.classList.toggle('hidden');
  socialCommentCount.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    tooglePreview();
  }
};

const createNewComment = ({avatar, name, message}) => {
  const commentBlock = document.createElement('li');
  const commentPicture = document.createElement('img');
  const commentText = document.createElement('p');

  commentBlock.classList.add('social__comment');
  commentPicture.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentPicture.width = AVATAR_SIZE;
  commentPicture.height = AVATAR_SIZE;

  commentText.textContent = message;

  commentBlock.appendChild(commentPicture);
  commentBlock.appendChild(commentText);
  commentFragment.appendChild(commentBlock);
};

const showPreview = ({url, likes, comments, description}) => {
  commentsList.innerHTML = '';
  tooglePreview();

  bigPictureImg.querySelector('img').src = url;
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
  bigPictureDescription.textContent = description;

  comments.forEach(createNewComment);
  commentsList.appendChild(commentFragment);
};

const addPhotoListClickHandler = (element, index ) => {
  element.addEventListener('click', () => {
    showPreview(userPhotos[index]);
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

photoList.forEach(addPhotoListClickHandler);

const closeBigPhoto = () =>{
  tooglePreview();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});
