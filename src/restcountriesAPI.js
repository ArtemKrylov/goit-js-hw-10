import { Notify } from 'notiflix';

export class RestcountriesAPI {
  static endpoint = 'https://restcountries.com/v2';
  static filter = 'fields=name,capital,population,flag,languages';

  constructor(refs) {
    this.refs = refs;
  }

  fetchCountriesNames(name) {
    return fetch(
      `${RestcountriesAPI.endpoint}/name/${name}?${RestcountriesAPI.filter}`
    ).then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
        this.#clearCountriesInfo();
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  #clearCountriesInfo() {
    this.refs.countryListEl.innerHTML = '';
    this.refs.countryInfoEl.innerHTML = '';
  }
}
