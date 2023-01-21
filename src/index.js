//*************imports***************
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import { RestcountriesAPI } from './restcountriesAPI';
import makeCountryListHTMLString from './templates/country-list';
import makeCountryInfoHTMLString from './templates/country-info';

//***********variables***************
const DEBOUNCE_DELAY = 300;
//html elements references
const refs = {
  searchBoxEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};
const restcountriesAPI = new RestcountriesAPI(refs);

//*************main code************

//adding event-listeners
refs.searchBoxEl.addEventListener(
  'input',
  debounce(onSearchBoxElInput, DEBOUNCE_DELAY)
);

//*************functions***********

//callback function for input event on search-box element
function onSearchBoxElInput(event) {
  const nameInput = event.target.value.trim();

  if (!nameInput || /^\s*$/.test(nameInput)) {
    clearElement(refs.countryInfoEl);
    clearElement(refs.countryListEl);
    return;
  }

  restcountriesAPI
    .fetchCountriesNames(nameInput)
    .then(data => {
      //if only one match - clears country-list and shows country-info
      if (data.length === 1) {
        refs.countryInfoEl.innerHTML = makeCountryInfoHTMLString(data[0]);
        showElement(refs.countryInfoEl);
        hideElement(refs.countryListEl);
        return;
      }
      if (data.length >= 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        hideElement(refs.countryListEl);
        hideElement(refs.countryInfoEl);
        return;
      }
      hideElement(refs.countryInfoEl);
      showElement(refs.countryListEl);
      refs.countryListEl.innerHTML = makeCountryListHTMLString(data);
    })
    .catch(error => {
      console.error(error);
    });
}

//clears HTML-element`s inner HTML
function clearElement(el) {
  el.innerHTML = '';
}

function hideElement(el) {
  if (!el.classList.contains('visually-hidden')) {
    el.classList.add('visually-hidden');
  }
}

function showElement(el) {
  if (el.classList.contains('visually-hidden')) {
    el.classList.remove('visually-hidden');
  }
}
