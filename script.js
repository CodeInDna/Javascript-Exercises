const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

  // select input element
const inputEl = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

  // add event listener to input element
inputEl.addEventListener('change', displayData);
inputEl.addEventListener('keyup', displayData);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

fetch(endpoint)
      .then(data => data.json())
      .then(places => cities.push(...places));

function displayData(){
    const matchArray = getMatches(this.value, cities);
    const html = matchArray.map(data => {
      const regex = new RegExp(this.value, 'gi');
      const city_name = data.city.replace(regex, `<span class = "hl">${this.value}</span>`);
      const state_name = data.state.replace(regex, `<span class = "hl">${this.value}</span>`);
        return `
          <li>
            <span class="name">${city_name}, ${state_name}</span>
            <span class="population">${numberWithCommas(data.population)}</span>
          </li>
        `
    }).join(' ');
    suggestions.innerHTML = html;
}

function getMatches(wordToMatch, cities){
    // get the value from input and look it in cities array
    return cities.filter(places => {
      const regex = new RegExp(wordToMatch, 'gi');
      return places.city.match(regex) || places.state.match(regex);
    });
}