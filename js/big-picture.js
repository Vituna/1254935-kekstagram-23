import {isEscEvent} from './utils.js';

const MAX_NUMBER_COMMENT = 5;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const photoList = body.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsAll = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let lastShownComment = 0;

const tooglePreview = () => {
  bigPicture.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
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
    <p class="social__text">${message}</p>
  `;
  return commentBlock;
};

const onCommentsLoaderClick = () => {
  const commentFragment = document.createDocumentFragment();
  const comments = currentComments
    .slice(lastShownComment, lastShownComment + MAX_NUMBER_COMMENT)
    .map(createNewComment);

  comments.forEach((element) => commentFragment.appendChild(element));
  commentsList.appendChild(commentFragment);

  lastShownComment += comments.length;
  if (lastShownComment >= currentComments.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);

  }
  socialCommentCount.innerHTML = getCommentCountHTML(lastShownComment, currentComments.length);
};

const onCommentsUpdate = ({comments}) => {
  currentComments = comments;
  lastShownComment = 0;
  commentsList.innerHTML = '';

  if (comments.length > 0) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    onCommentsLoaderClick();
  } else {
    socialCommentCount.innerHTML = getCommentCountHTML(0, 0);
  }
};

const showPreview = ({url, likes, comments, description}) => {
  commentsList.innerHTML = '';
  tooglePreview();
  onCommentsUpdate({comments});

  bigPictureImg.querySelector('img').src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsAll.textContent = comments.length;
  bigPictureDescription.textContent = description;
};

const onBigPhotoClose = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onBigPhotoOpen = (element ) => {
  showPreview(element);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', onBigPhotoClose);
};

const onAddPhotoListClick = (data) => {
  const onPreviewClick = (evt) => {
    const preview = evt.target.closest('.picture');
    if (preview) {
      evt.preventDefault();
      const previewId = +preview.dataset.id;
      const dataElement = data.find(({id}) => id === previewId);

      onBigPhotoOpen(dataElement);
    }
  };
  photoList.addEventListener('click', onPreviewClick);
};

export {onAddPhotoListClick};
