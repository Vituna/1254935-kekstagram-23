const ERROR = 'Не корректный диапазон:)';
const MAX_LENGTH = 140;

let chekedString;

const getRandomNumber = (min, max) => (min >= max || min < 0) ? ERROR : Math.floor(Math.random() * ((max + 1) - min) + min);

const getMaxStringLength = (string, maxLength) => (string <= maxLength);

getRandomNumber(0, 20);

getMaxStringLength(chekedString, MAX_LENGTH);
