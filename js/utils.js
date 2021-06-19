const ERROR = 'Не корректный диапазон:)';

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

export {getMaxStringLength, getRandomNumber, getRandomArrElement, getIndexes, getRandomNonRepeatingNumbers, isEscEvent};
