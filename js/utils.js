const ERROR = 'Не корректный диапазон:)';
const RERENDER_DELAY = 500;

const getMaxStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomNumber = (min, max) => (min >= max || min < 0) ? ERROR : Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomArrElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIndexes = (count) => [...Array(count).keys()];

const getRandomNonRepeatingNumbers = (min, max) => {
  const previousValues = [];
  let currentValue = getRandomNumber(min, max);
  if (previousValues.length >= (max - min + 1)) {
    throw new Error(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
  }
  while (previousValues.includes(currentValue)) {
    currentValue = getRandomNumber(min, max);
  }
  previousValues.push(currentValue);
  return currentValue;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffle = (array) => {
  array = [...array];

  for (let item = array.length - 1; item > 0; item--) {
    const cd = Math.floor(Math.random() * (item + 1));

    [array[item], array[cd]] = [array[cd], array[item]];
  }
  return array;
};

const sortByField = (field) => (commentsA, commentsB) => commentsA[field] > commentsB[field] ? 1 : -1;

export {getMaxStringLength, getRandomNumber, getRandomArrElement, getIndexes, getRandomNonRepeatingNumbers, isEscEvent, shuffle, debounce, sortByField};
