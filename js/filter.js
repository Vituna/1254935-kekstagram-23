import {sortByField, debounce, getRandomUniqueIntegerList} from './utils.js';
import {renderMiniPhotos} from './rendering-thumbnails.js';

const SWITCH_DELAY = 500;
const RANDOM_PHOTOS_LENGTH_MIN = 0;
const RANDOM_PHOTOS_LENGTH_MAX = 10;

const thumbailContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const imgFilterButtons = imgFilters.querySelectorAll('.img-filters__button');
const imgFilterDefault = imgFilters.querySelector('#filter-default');
const imgFilterRandom = imgFilters.querySelector('#filter-random');
const imgFilterDiscussed = imgFilters.querySelector('#filter-discussed');

const applyFilterImages = (filterButton) => {
  imgFilterButtons.forEach((imgFilterButton) => {
    imgFilterButton.classList.remove('img-filters__button--active');
  });
  filterButton.classList.add('img-filters__button--active');
};

const renderFilteredPhotoList = debounce(
  (photo) => {
    const pictures = thumbailContainer.querySelectorAll('.picture');

    pictures.forEach((picture) => {
      picture.remove();
    });
    renderMiniPhotos(photo);
  },
  SWITCH_DELAY,
);

const onPhotoFilterRender = (photos) => {
  imgFilterDefault.addEventListener('click', () => {
    applyFilterImages(imgFilterDefault);
    renderFilteredPhotoList(photos);
  });

  imgFilterRandom.addEventListener('click', () => {
    let photosMaxId = RANDOM_PHOTOS_LENGTH_MIN;
    photos.forEach((photo) => photosMaxId = Math.max(photo.id, photosMaxId));
    const uniqueIntegerList = getRandomUniqueIntegerList(RANDOM_PHOTOS_LENGTH_MIN, photosMaxId, RANDOM_PHOTOS_LENGTH_MAX);
    const filterRandomPhotos = photos.filter((photo) => uniqueIntegerList.includes(photo.id));
    applyFilterImages(imgFilterRandom);
    renderFilteredPhotoList(filterRandomPhotos);
  });

  imgFilterDiscussed.addEventListener('click', () => {
    applyFilterImages(imgFilterDiscussed);
    const photosCloned = [...photos];
    photosCloned.sort(sortByField('comments'));
    renderFilteredPhotoList(photosCloned.reverse());
  });
};

export {onPhotoFilterRender};
