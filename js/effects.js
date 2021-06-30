const DEFAULT_EFFECT_VALUE = 100;
const DEFAULT_EFFECT_STEP = 1;
const MIN_RANGE_VALUE = 0;
const MAIN_MAX_VALUE = 1;
const MAIN_STEP_VALUE = 0.1;
const ADDITIONAL_MAX_VALUE = 3;

const iamgeUploadPreview = document.querySelector('.img-upload__preview');
const iamgePreview = iamgeUploadPreview.querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');

effectLevelSlider.classList.add('hidden');
effectLevelValue.value = DEFAULT_EFFECT_VALUE;
const classes = iamgePreview.className.split(' ');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: MIN_RANGE_VALUE,
    max: DEFAULT_EFFECT_VALUE,
  },
  start: DEFAULT_EFFECT_VALUE,
  step: DEFAULT_EFFECT_STEP,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const changesValueSlider = (minRangeValue, maxRangeValue, sliderStep) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: minRangeValue,
      max: maxRangeValue,
    },
    start: maxRangeValue,
    step: sliderStep,
  });
};

const changesStylePhoto = (filterStyle, filerMeaning) => {
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    iamgePreview.style.filter = `${filterStyle}(${effectLevelValue.value}${filerMeaning})`;
  });
};

const addDesiredClass = (desiredClass) => {
  effectLevelSlider.classList.remove('hidden');
  iamgePreview.className = classes.join(' ');
  iamgePreview.classList.add(desiredClass);
};

const onChromeEffectClick = () => {
  addDesiredClass('effects__preview--chrome');
  changesStylePhoto('grayscale', '');
  changesValueSlider(MIN_RANGE_VALUE, MAIN_MAX_VALUE, MAIN_STEP_VALUE);
};

const onSepiaEffectClick = () => {
  addDesiredClass('effects__preview--sepia');
  changesStylePhoto('sepia', '');
  changesValueSlider(MIN_RANGE_VALUE, MAIN_MAX_VALUE, MAIN_STEP_VALUE);
};

const onMarvinEffectClick = () => {
  addDesiredClass('effects__preview--marvin');
  changesStylePhoto('invert', '%');
  changesValueSlider(MIN_RANGE_VALUE, DEFAULT_EFFECT_VALUE, DEFAULT_EFFECT_STEP);
};

const onPhobosEffectClick = () => {
  addDesiredClass('effects__preview--phobos');
  changesStylePhoto('blur', 'px');
  changesValueSlider(MIN_RANGE_VALUE, ADDITIONAL_MAX_VALUE, MAIN_STEP_VALUE);
};

const onHeatEffectClick = () => {
  addDesiredClass('effects__preview--heat');
  changesStylePhoto('brightness', '');
  changesValueSlider(MAIN_MAX_VALUE, ADDITIONAL_MAX_VALUE, MAIN_STEP_VALUE);
};

const onNoneEffectClick = () => {
  effectLevelSlider.classList.add('hidden');
  iamgePreview.className = classes.join(' ');
  iamgePreview.style.filter = 'none';
};

effectNone.addEventListener('click', onNoneEffectClick);
effectChrome.addEventListener('click', onChromeEffectClick);
effectSepia.addEventListener('click', onSepiaEffectClick);
effectMarvin.addEventListener('click', onMarvinEffectClick);
effectPhobos.addEventListener('click', onPhobosEffectClick);
effectHeat.addEventListener('click', onHeatEffectClick);

export {onNoneEffectClick};
