import {isEscEvent} from './utils.js';

const Template = {
  ERROR: document.querySelector('#error').content.querySelector('.error'),
  SUCCESS: document.querySelector('#success').content.querySelector('.success'),
};

let currentMessage = null;

const onMessageInnerClick = (evt) => {
  evt.stopPropagation();
};

const hideMessage = () => {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
    document.removeEventListener('click', hideMessage);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const createMessage = (type) => {
  const messageNode = Template[type.toUpperCase()].cloneNode(true);
  const buttonNode = messageNode.querySelector(`.${type.toLowerCase()}__button`);
  const messageInnerNode = messageNode.querySelector(`.${type.toLowerCase()}__inner`);

  buttonNode.addEventListener('click', hideMessage);
  messageInnerNode.addEventListener('click', onMessageInnerClick);
  document.addEventListener('keydown', onDocumentKeydown);

  return messageNode;
};

const showMessage = (type) => {
  if (currentMessage) {
    hideMessage();
  }
  currentMessage = createMessage(type);
  document.body.appendChild(currentMessage);
};

export {showMessage};
