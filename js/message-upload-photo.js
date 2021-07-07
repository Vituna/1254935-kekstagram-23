import {isEscEvent} from './utils.js';

const Template = {
  ERROR: document.querySelector('#error').content.querySelector('.error'),
  SUCCESS: document.querySelector('#success').content.querySelector('.success'),
};

let currentMessage = null;

const onMessageInnerClick = (evt) => {
  evt.stopPropagation();
};

const onMessageHide = () => {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
    document.removeEventListener('click', onMessageHide);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onMessageHide();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onMessageCreate = (type) => {
  const messageNode = Template[type.toUpperCase()].cloneNode(true);
  const buttonNode = messageNode.querySelector(`.${type.toLowerCase()}__button`);
  const messageInnerNode = messageNode.querySelector(`.${type.toLowerCase()}__inner`);

  buttonNode.addEventListener('click', onMessageHide);
  messageInnerNode.addEventListener('click', onMessageInnerClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onMessageHide);

  return messageNode;
};

const showMessage = (type) => {
  if (currentMessage) {
    onMessageHide();
  }
  currentMessage = onMessageCreate(type);
  document.body.appendChild(currentMessage);
};

export {showMessage};
