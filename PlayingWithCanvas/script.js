<<<<<<< HEAD
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
=======
const canvasElement = document.querySelector('#draw');
	const ctx = canvasElement.getContext('2d');	// returns an object that provides methods and properties for drawing on the canvas.cd

	// set W*H of canvas acc to the window W*H
	canvasElement.width = window.innerWidth;
	canvasElement.height = window.innerHeight;

	// default color
	ctx.strokeStyle = '#BADA55';
	// set type of corner created, when two lines meet
	ctx.lineJoin = 'round';  // miter(pointed) // bevel(squared)
	// set the style of end cap for a line
	ctx.lineCap = 'round';	//butt //square
	ctx.lineWidth = 100;

	let isDrawing = false;
	let lastX = 0;
	let lastY = 0;
	let hue = 0;	// hsl(hue, saturation, light) color
	let direction = true;
	function draw(e){
		if(!isDrawing) return;	// stop fn when no mouse down

		ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;

		ctx.beginPath();	//begin or reset current path
		// start from
		ctx.moveTo(lastX, lastY);
		// go to
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();	// draw it
		[lastX, lastY] = [e.offsetX, e.offsetY];

		hue++;
		if(hue >= 360) hue=0;

		if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;
		direction === true ? ctx.lineWidth++ : ctx.lineWidth--;
	}
	// add listener to mouse events
	canvasElement.addEventListener('mousedown', (e) => {
		isDrawing = true;
		[lastX, lastY] = [e.offsetX, e.offsetY];
	});	
	canvasElement.addEventListener('mousemove', draw);		
	canvasElement.addEventListener('mouseup', () => isDrawing = false);
	canvasElement.addEventListener('mouseout', () => isDrawing = false);
>>>>>>> PlayingWithCanvas/master
