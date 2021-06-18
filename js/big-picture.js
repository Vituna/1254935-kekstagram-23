import {userPhotos} from './data.js';
import {onPopupEscKeydown} from './close-big-photo.js';

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
const commentFragment = document.createDocumentFragment();

const addPhotoListClickHandler = (photoId, {url, likes, comments, description}) => {
  photoId.addEventListener('click', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
    commentsList.innerHTML = '';
    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    bigPictureImg.querySelector('img').src = url;
    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments.lenght;
    bigPictureDescription.textContent = description;

    comments.forEach(({avatar, name, message}) => {
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
    });
    commentsList.appendChild(commentFragment);
  });
};

photoList.forEach((photoId, item) => {
  addPhotoListClickHandler(photoId, userPhotos[item]);
});
