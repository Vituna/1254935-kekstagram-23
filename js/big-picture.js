import {userPhotos} from './data.js';
import {isEscEvent} from './utils.js';

const MAX_NUMBER_COMENT = 5;

const body = document.querySelector('body');
const photoList = body.querySelectorAll('.picture');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsAll = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const commentFragment = document.createDocumentFragment();

let currentComments = [];
let lastShownComment = 0;

const tooglePreview = () => {
  bigPicture.classList.toggle('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.toggle('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    tooglePreview();
  }
};

const getCommentCountHTML = (numberOpenComments, allComments) =>
  `${numberOpenComments} из <span class="comments-count">${allComments}</span> комментариев`;

const createNewComment = ({avatar, name, message}) => {
  const commentBlock = document.createElement('li');
  commentBlock.classList.add('social__comment');
  commentBlock.innerHTML = `
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text"></p>
  `;
  commentBlock.querySelector('.social__text').textContent = message;
  return commentBlock;
};

const onCommentsLoaderClick = () => {
  const commentItem = currentComments
    .slice(lastShownComment, lastShownComment + MAX_NUMBER_COMENT)
    .map(createNewComment);

  commentItem.forEach((element) => commentFragment.appendChild(element));
  commentsList.appendChild(commentFragment);

  lastShownComment += MAX_NUMBER_COMENT;
  if (lastShownComment >= currentComments.length) {
    lastShownComment = currentComments.length;
    // eslint-disable-next-line no-use-before-define
    addCommentsLoader();
  }
  socialCommentCount.innerHTML = getCommentCountHTML(lastShownComment, currentComments.length);
};

const updateComments = ({comments}) => {
  currentComments = comments;
  lastShownComment = 0;
  commentsList.innerHTML = '';

  if (comments.length > 0) {
    // eslint-disable-next-line no-use-before-define
    removeCommentsLoader();
    commentsLoader.click();
  } else {
    socialCommentCount.innerHTML = getCommentCountHTML(0, 0);
  }
};

const showPreview = ({url, likes, comments, description}) => {
  commentsList.innerHTML = '';
  tooglePreview();

  bigPictureImg.querySelector('img').src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsAll.textContent = comments.length;
  bigPictureDescription.textContent = description;

  onCommentsLoaderClick();
  commentsList.appendChild(commentFragment);
};

const addPhotoListClickHandler = (element, index ) => {
  element.addEventListener('click', () => {
    showPreview(userPhotos[index]);
    updateComments(userPhotos[index]);
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

photoList.forEach(addPhotoListClickHandler);

const removeCommentsLoader = () => {
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const addCommentsLoader = () => {
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const closeBigPhoto = () =>{
  tooglePreview();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});
