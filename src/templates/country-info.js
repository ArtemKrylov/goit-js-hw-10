export default function makeCountryInfoHTMLString({
  name,
  flag,
  capital,
  population,
  languages,
}) {
  return `
				<div class="country-main-info">
					<img src="${flag}" class="icon" width="50" height="50">
					<h1>${name}</h1>
				</div>	
				<ul class="country-detailes-list">
					<li><b>Capital:</b> ${capital}</li>
					<li><b>Population:</b> ${population}</li>
					<li><b>Languages:</b> ${languages.map(el => el.name).join(', ')}</li>
				</ul>
		`;
}
