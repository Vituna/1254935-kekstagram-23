const ERROR = 'Не корректный диапазон:)';
const ERROR_SERVER = 'Сервер не отвечает';
const RERENDER_DELAY = 500;

const getRandomNumber = (min, max) => (min >= max || min < 0) ? ERROR : Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomArrElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIndexes = (count) => [...Array(count).keys()];

const getRandomUniqueIntegerList = (min, max, length) => {
  const list = [];
  while (list.length !== length) {
    const number = getRandomNumber(min, max);
    if (!list.includes(number)) {
      list.push(number);
    }
  }
  return list;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const sortByField = (field) => (commentsA, commentsB) => commentsA[field] > commentsB[field] ? 1 : -1;

export {getRandomNumber, getRandomArrElement, getIndexes, isEscEvent, debounce, sortByField, getRandomUniqueIntegerList, ERROR_SERVER};
