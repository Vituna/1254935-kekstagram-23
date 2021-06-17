import {createSimilarPhotoDescription} from './data.js';

const thumbailContair = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const generateThumbnail = document.createDocumentFragment();

createSimilarPhotoDescription.forEach(({url, comments, likes}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  generateThumbnail.appendChild(newThumbnail);
});

thumbailContair.appendChild(generateThumbnail);
