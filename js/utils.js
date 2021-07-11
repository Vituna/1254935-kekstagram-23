const ERROR = 'Не корректный диапазон:)';
const ERROR_SERVER_MESSAGE = 'Сервер не отвечает';
const RERENDER_DELAY = 500;

const getRandomNumber = (min, max) => (min >= max || min < 0) ? ERROR : Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomUniqueIntegerList = (min, max, length) => {
  const lists = [];
  while (lists.length !== length) {
    const number = getRandomNumber(min, max);
    if (!lists.includes(number)) {
      lists.push(number);
    }
  }
  return lists;
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

const createAlert = (text) => {
  const newSectionError = document.createElement('section');
  newSectionError.classList.add('error');
  newSectionError.innerHTML = `
    <div class="error__inner">
      <h2 class="error__title">${text}</h2>
    </div>
  `;
  return newSectionError;
};

const showAlert = (text) => document.body.appendChild(createAlert(text));

export {getRandomNumber, isEscEvent, debounce, sortByField, getRandomUniqueIntegerList, showAlert, ERROR_SERVER_MESSAGE};
