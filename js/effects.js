const DEFAULT_EFFECT_VALUE = 100;
const MIN_RANGE_VALUE = 0;
const MAIN_MAX_VALUE = 1;
const MAIN_STEP_VALUE = 0.1;
const ADDITIONAL_MAX_VALUE = 3;
const MIN_EFFECT_HEAT = 1;
const STEP_MARVIN = 1;

const EffectNameToFilter = {
  chrome: {
    name: 'grayscale',
    min: MIN_RANGE_VALUE,
    max: MAIN_MAX_VALUE,
    step: MAIN_STEP_VALUE,
  },
  sepia: {
    name: 'sepia',
    min: MIN_RANGE_VALUE,
    max: MAIN_MAX_VALUE,
    step: MAIN_STEP_VALUE,
  },
  marvin: {
    name: 'invert',
    min: MIN_RANGE_VALUE,
    max: DEFAULT_EFFECT_VALUE,
    step: STEP_MARVIN,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: MIN_RANGE_VALUE,
    max: ADDITIONAL_MAX_VALUE,
    step: MAIN_STEP_VALUE,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: MIN_EFFECT_HEAT,
    max: ADDITIONAL_MAX_VALUE,
    step: MAIN_STEP_VALUE,
  },
};

const imageUploadPreview = document.querySelector('.img-upload__preview');
const imagePreview = imageUploadPreview.querySelector('img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

let currentEffect;

const updateSliderOptions = (nameEffect) => {
  const {
    min,
    max,
    step,
  } = EffectNameToFilter[nameEffect];

  effectLevelSlider.noUiSlider.off();
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });
};

const createSlider = (nameEffect) => {
  const {
    min,
    max,
    step,
  } = EffectNameToFilter[nameEffect];

  effectLevelSlider.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min,
      max,
    },
    start: max,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

const setEffect = (nameEffect) => {
  const {
    name: filterName,
    unit = '',
  } = EffectNameToFilter[nameEffect];

  if (effectLevelSlider.noUiSlider) {
    updateSliderOptions(nameEffect);
  } else {
    createSlider(nameEffect);
  }
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    imagePreview.style.filter = `${filterName}(${effectLevelValue.value}${unit})`;
  });
};

const onEffectDestroy = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.off();
    effectLevelSlider.noUiSlider.destroy();
  }
  imgUploadEffectLevel.classList.add('hidden');
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
};

const onEffectChange = (evt) => {
  const effectRadioButton = evt.target;
  if (effectRadioButton.matches('.effects__radio')) {
    imagePreview.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = effectRadioButton.value;
    imagePreview.classList.add(`effects__preview--${currentEffect}`);

    if (currentEffect === 'none') {
      onEffectDestroy();
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      setEffect(currentEffect);
    }
  }
};

const onEffectsInit = () => {
  currentEffect = 'none';
  imagePreview.classList.add(`effects__preview--${currentEffect}`);
  effectsList.addEventListener('change', onEffectChange);
  imgUploadEffectLevel.classList.add('hidden');
};

const onEffectsDestroy = () => {
  onEffectDestroy();
  imagePreview.classList.remove(`effects__preview--${currentEffect}`);
  effectsList.removeEventListener('change', onEffectChange);
};

export {onEffectsInit, onEffectsDestroy};
