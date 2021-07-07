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

export {showAlert};
