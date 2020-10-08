import countries from './countries.json';
import itemsTemplate from '../templates/gallery-items.hbs';
import '../css/common.css';
import '../css/gallery.css';

const galleryRef = document.querySelector('.js-gallery');

const markup = itemsTemplate(countries);
galleryRef.insertAdjacentHTML('beforeend', markup);
