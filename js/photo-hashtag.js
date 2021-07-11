const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;
const ERROR_BORDER_COLOR = 'red';
const DEFAULT_BORDER_COLOR = 'blue';
const HASHTAG_REGEXP = new RegExp('^#[A-Za-zА-Яа-я0-9]{1,110}$');

const inputHashtag = document.querySelector('.text__hashtags');

const setHashtagsStyles = (borderColor = DEFAULT_BORDER_COLOR, outlineColor = DEFAULT_BORDER_COLOR) => {
  inputHashtag.style.borderColor = borderColor;
  inputHashtag.style.outlineColor = outlineColor;
};

const onHashtagInput = () => {
  let isHashtagCorrect = true;
  let hashtagsMaxLength = 0;

  const hashtags = inputHashtag.value.split(' ');
  const hashtag = hashtags.map((tag) => tag.toLowerCase());
  const hashtagsSet = new Set(hashtag);

  for (let index = 0; index < hashtag.length; index++) {
    hashtagsMaxLength = Math.max(hashtagsMaxLength, hashtag[index].length);

    isHashtagCorrect = isHashtagCorrect && HASHTAG_REGEXP.test(hashtag[index]);
  }
  if (hashtagsMaxLength === 0) {
    inputHashtag.setCustomValidity('');
    setHashtagsStyles();
  } else if (hashtag.includes('#')) {
    inputHashtag.setCustomValidity(`Минимальная длина хэш-тега ${MIN_HASHTAG_LENGTH} символа, включая решётку`);
    setHashtagsStyles(ERROR_BORDER_COLOR, ERROR_BORDER_COLOR);
  }  else if (!isHashtagCorrect) {
    inputHashtag.setCustomValidity('Строка после решётки может состоять из букв и чисел и не может содержать пробелы!');
    setHashtagsStyles(ERROR_BORDER_COLOR, ERROR_BORDER_COLOR);
  } else if (hashtagsMaxLength > MAX_HASHTAG_LENGTH) {
    inputHashtag.setCustomValidity(`Максимальная длина хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
    setHashtagsStyles(ERROR_BORDER_COLOR, ERROR_BORDER_COLOR);
  } else if (hashtag.length > MAX_HASHTAG_COUNT) {
    inputHashtag.setCustomValidity(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хэш-тегов`);
    setHashtagsStyles(ERROR_BORDER_COLOR, ERROR_BORDER_COLOR);
  } else if (hashtag.length !== hashtagsSet.size) {
    inputHashtag.setCustomValidity('Такой хэш-тег уже набран');
    setHashtagsStyles(ERROR_BORDER_COLOR, ERROR_BORDER_COLOR);
  } else {
    inputHashtag.setCustomValidity('');
    setHashtagsStyles();
  }
};

export {onHashtagInput};
