const DEFAULT_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const TRANSFORM_STYLE_PHOTO = 0.01;
const DEFAULT_TRANSFORM_STYLE_PHOTO = 1;

const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');

let scaleValue = DEFAULT_SCALE_VALUE;
scaleControlValue.value = `${scaleValue}%`;

const setRescalePhoto = (isIntermediateValue, computation) => {
  if (isIntermediateValue) {
    scaleValue = computation;
    scaleControlValue.value = `${scaleValue}%`;
    imageUploadPreview.style.transform = `scale(${scaleValue * TRANSFORM_STYLE_PHOTO})`;
  }
};

const onMinusButtonClick = () => {
  setRescalePhoto(scaleValue > STEP_SCALE_VALUE, scaleValue - STEP_SCALE_VALUE);
};

const onPlusButtonClick = () => {
  setRescalePhoto(scaleValue < DEFAULT_SCALE_VALUE, scaleValue + STEP_SCALE_VALUE);
};

const setDefaultScale = () => {
  scaleValue = DEFAULT_SCALE_VALUE;
  imageUploadPreview.style.transform = `scale(${DEFAULT_TRANSFORM_STYLE_PHOTO})`;
  scaleControlValue.value = (`${DEFAULT_SCALE_VALUE}%`);
};

export {setDefaultScale, onMinusButtonClick, onPlusButtonClick};
