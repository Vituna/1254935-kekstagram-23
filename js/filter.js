import {shuffle, sortByField, debounce, getRandomNonRepeatingNumbers} from './utils.js';
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

const onPhotoFilterRender = (photo) => {
  imgFilterDefault.addEventListener('click', () => {
    applyFilterImages(imgFilterDefault);
    renderFilteredPhotoList(photo);
  });

  imgFilterRandom.addEventListener('click', () => {
    applyFilterImages(imgFilterRandom);
    shuffle(photo);
    const slicedRandomPhotos = photo.slice(getRandomNonRepeatingNumbers(RANDOM_PHOTOS_LENGTH_MIN, RANDOM_PHOTOS_LENGTH_MAX));
    renderFilteredPhotoList(slicedRandomPhotos);
  });

  imgFilterDiscussed.addEventListener('click', () => {
    applyFilterImages(imgFilterDiscussed);
    const photosCloned = [...photo];
    photosCloned.sort(sortByField('comments'));
    renderFilteredPhotoList(photosCloned.reverse());
  });
};

export {onPhotoFilterRender};
