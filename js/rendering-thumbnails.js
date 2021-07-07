const imgFilters = document.querySelector('.img-filters');
const thumbailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const renderMiniPhotos = (photos) => {
  photos.forEach(({id, url, comments, likes}) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);
    newThumbnail.dataset.id = id;
    newThumbnail.querySelector('.picture__img').src = url;
    newThumbnail.querySelector('.picture__comments').textContent = comments.length;
    newThumbnail.querySelector('.picture__likes').textContent = likes;
    documentFragment.appendChild(newThumbnail);
  });

  thumbailContainer.appendChild(documentFragment);
  imgFilters.classList.remove('img-filters--inactive');
};

export {renderMiniPhotos};
