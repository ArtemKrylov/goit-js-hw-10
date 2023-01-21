export default function makeCountryListHTMLString(arr) {
  return arr
    .map(
      el => `
			<li class="country-list__item">
				<img src="${el.flag}" class="icon" width="50" height="50">
				<p>${el.name}</p>
			</li>
		`
    )
    .join('');
}
