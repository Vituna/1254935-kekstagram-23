const ERROR = 'Не корректный диапазон:)';

const getMaxStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomNumber = (min, max) => (min >= max || min < 0) ? ERROR : Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomArrElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIndexes = (count) => [...Array(count).keys()];

export {getMaxStringLength, getRandomNumber, getRandomArrElement, getIndexes};
