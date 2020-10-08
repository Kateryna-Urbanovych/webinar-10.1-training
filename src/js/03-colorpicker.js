import colorCardTpl from '../templates/color-card.hbs';
import colorCardsTpl from '../templates/color-cards.hbs';
import colors from './colors.json';
import '../css/common.css';
import '../css/colorpicker.css';

const paletteContainer = document.querySelector('.js-palette');

const cardsMarkup = createColorCardsMarkup(colors);
paletteContainer.insertAdjacentHTML('beforeend', cardsMarkup);

paletteContainer.addEventListener('click', onPaletteContainerClick);

function createColorCardsMarkup(colors) {
  // return colors.map(color => colorCardTpl(color)).join('');
  // поскольку мы используем map, все-равно придет один цвет
  // return colors.map(colorCardTpl).join('');

  return colorCardsTpl(colors);
}

function onPaletteContainerClick(event) {
  if (!event.target.classList.contains('color-swatch')) {
    return;
  }

  const swatchEl = event.target;
  // const parentSwatchEL = swatchEl.parentNode;
  const parentSwatchEL = swatchEl.closest('.color-card');

  removeClassFromActiveCard();
  addClassToActiveCard(parentSwatchEL);
  setBodyBgColor(swatchEl.dataset.hex);
}

function removeClassFromActiveCard() {
  const currentActiveCard = document.querySelector('.color-card.is-active');

  if (currentActiveCard) {
    currentActiveCard.classList.remove('is-active');
  }
}

function addClassToActiveCard(card) {
  card.classList.add('is-active');
}

function setBodyBgColor(color) {
  document.body.style.backgroundColor = color;
}
