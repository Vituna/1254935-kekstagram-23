const ERROR = 'Не корректный диапазон:)';
const MAX_LENGTH = 140;
const PHOTOS = 'photos/';
const AVATAR = 'img/avatar-';
const SIMILAR_POSTS_COUNT = 25;
const SIMILAR_COMMENTS_COUNT = 6;

const DESCRIPTION = [
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

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAME = [
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

Array.prototype.getRandom = function(num, cut){
  const Asr = cut ? this : this.slice(0);
  Asr.sort(() => .5 - Math.random());
  return Asr.splice(0, num);
};

const createComment = function(index) {
  return {
    id: index + 1,
    avatar: `${AVATAR + (getRandomNumber(AvatarNumber.MIN, AvatarNumber.MAX))}.svg`,
    message: MESSAGE.getRandom(getRandomNumber(1, 2)),
    name: getRandomArrElement(USER_NAME),
  };
};

const createPost = function (index) {
  const similarComments = getIndexes(getRandomNumber(0, SIMILAR_COMMENTS_COUNT)).map(createComment);
  return {
    id: index + 1,
    url: `${PHOTOS + (index + 1)}.jpg`,
    description: getRandomArrElement(DESCRIPTION),
    likes: getRandomNumber(LikesCount.MIN, LikesCount.MAX),
    comments: similarComments,
  };
};

const createSimilarPhotoDescription = getIndexes(SIMILAR_POSTS_COUNT).map(createPost);
createSimilarPhotoDescription;
// console.log(createSimilarPhotoDescription);

getMaxStringLength(chekedString, MAX_LENGTH);
