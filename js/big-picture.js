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

const elementsToClose = () => {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    elementsToClose();
  }
};

const createNewComment = (avatar, name, message) => {
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

const addPhotoListClickHandler = (photoId, {url, likes, comments, description}) => {
  const openPhoto = photoId;

  const createNewBigPhoto = () => {
    commentsList.innerHTML = '';
    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    bigPictureImg.querySelector('img').src = url;
    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments.length;
    bigPictureDescription.textContent = description;

    comments.forEach(({avatar, name, message}) => {
      createNewComment(avatar, name, message);
    });
    commentsList.appendChild(commentFragment);
  };

  openPhoto.addEventListener('click', () => {
    createNewBigPhoto();
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

photoList.forEach((photoId, item) => {
  addPhotoListClickHandler(photoId, userPhotos[item]);
});

const closeBigPhoto = () =>{
  elementsToClose();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});

