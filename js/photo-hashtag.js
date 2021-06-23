const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REGEXP = new RegExp('^#[A-Za-zА-Яа-я0-9]{1,19}$');

const inputHashtag = document.querySelector('.text__hashtags');

const onHashtagInput = () => {
  let hashtagCorrect = true;
  let hashtagsMaxLength = 0;

  const hashtags = inputHashtag.value.split(' ');
  const hashtag = hashtags.map((tag) => tag.toLowerCase());
  const hashtagsSet = new Set(hashtag);

  // eslint-disable-next-line id-length
  for (let i = 0; i < hashtag.length; i++) {
    hashtagsMaxLength = Math.max(hashtagsMaxLength, hashtag[i].length);
    hashtagCorrect = hashtagCorrect && HASHTAG_REGEXP.test(hashtag[i]);
  }

  if (hashtag.includes('#')) {
    inputHashtag.setCustomValidity(`Минимальная длина хэш-тега ${MIN_HASHTAG_LENGTH} символа, включая решётку`);
  } else if (!hashtagCorrect) {
    inputHashtag.setCustomValidity('Строка после решётки может состоять из букв и чисел и не может содержать пробелы!');
  } else if (hashtagsMaxLength > MAX_HASHTAG_LENGTH) {
    inputHashtag.setCustomValidity(`Максимальная длина хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
  } else if (hashtag.length > MAX_HASHTAG_COUNT) {
    inputHashtag.setCustomValidity(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хэш-тегов`);
  } else if (hashtag.length !== hashtagsSet.size) {
    inputHashtag.setCustomValidity('Такой хэш-тег уже набран');
  } else {
    inputHashtag.setCustomValidity('');
  }
  inputHashtag.reportValidity();
};

export {onHashtagInput};
