const ERROR = 'Не корректный диапазон:)';
const MAX_LENGTH = 140;
const PHOTOS = 'photos/';
const AVATAR = 'img/avatar-';
const SIMILAR_POSTS_COUNT = 25;
const SIMILAR_COMMENTS_COUNT = 6;

const DESCRIPTIONS = [
  'Всегда так пусто',
  'Пляж где-то там',
  'Тишина',
  'Красивая фотосессия',
  'Всегда весёлый обед:)',
  'Взял покататься',
  'Спасает прохладное',
  'За мной летят;)',
  'Было классно',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Виктор',
  'Нина',
  'Пётр',
  'Олег',
  'Фёдр',
  'Елена',
];

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const AvatarNumber = {
  MIN: 1,
  MAX: 6,
};

const chekedString = [];

const getMaxStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomNumber = (min, max) => (min >= max || min < 0) ? ERROR : Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomArrElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIndexes = (count) => [...Array(count).keys()];

const getSortedComments = (arr) => arr.sort(() => .5 - Math.random());
const getRondomComments = (arr) => getSortedComments(arr).slice(getRandomNumber (1, 2));

const createComment = (index) => ({
  id: index + 1,
  avatar: `${AVATAR + (getRandomNumber(AvatarNumber.MIN, AvatarNumber.MAX))}.svg`,
  message: getRondomComments(MESSAGES).toString(),
  name: getRandomArrElement(USER_NAMES),
});

const createPost = (index) => {
  const similarComments = getIndexes(getRandomNumber(0, SIMILAR_COMMENTS_COUNT)).map(createComment);
  return {
    id: index + 1,
    url: `${PHOTOS + (index + 1)}.jpg`,
    description: getRandomArrElement(DESCRIPTIONS),
    likes: getRandomNumber(LikesCount.MIN, LikesCount.MAX),
    comments: similarComments,
  };
};

// eslint-disable-next-line no-unused-vars
const createSimilarPhotoDescription = getIndexes(SIMILAR_POSTS_COUNT).map(createPost);
// console.log(createSimilarPhotoDescription);
getMaxStringLength(chekedString, MAX_LENGTH);
