import {userPhotos} from './data.js';

const thumbailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const generateThumbnail = document.createDocumentFragment();

userPhotos.forEach(({url, comments, likes}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  generateThumbnail.appendChild(newThumbnail);
});

thumbailContainer.appendChild(generateThumbnail);
