// Setting colors to the blocks
var numSquares = 6;
var randomColorCode;
var pickedColor;
var squares = document.querySelectorAll('.squares');
var modes = document.querySelectorAll('.mode');
var rgbDisplay = document.querySelector('#rgbDisplay');
var statusDisplay = document.querySelector('#statusDisplay');
var h1 = document.querySelector('h1');
var resetColors = document.querySelector('#resetColors');
var easyDisplay = document.querySelector('#easyDisplay');
var hardDisplay = document.querySelector('#hardDisplay');

init();
function init(){
	setUpModeButtons();
	setUpSquare();
	reset();
}

// Squares are clicked
function setUpSquare(){
	for (var i = 0; i < 6; i++) {
		squares[i].addEventListener('click', function(){
			var clickedSquare = this.style.background;
			if(clickedSquare === pickedColor){
				statusDisplay.textContent = 'Correct!';
				resetColors.textContent = 'Play Again?';
				colorAll(clickedSquare);
			}else{
				statusDisplay.textContent = 'Try Again!';
				resetColors.textContent = 'New Colors';
				this.style.background = '#232323';
			}
		})
	}
}

function setUpModeButtons(){
	// modes hard and easy
	for (var i = 0; i < modes.length; i++) {
		modes[i].addEventListener('click', function(){
			modes[0].classList.remove("selected");
			modes[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6; 
			reset();
		})
	}
}
//Play Again or New Colors (Reseting Colors)
resetColors.addEventListener('click', function(){
	reset();
})

function reset(){
	//get the color codes from the function generateRandomColors
	randomColorCode = generateRandomColors(numSquares);
	// pick one color among 6 to ask question for
	pickedColor = pickColor(numSquares);
	// setting rgbDisplay to the color picked
	rgbDisplay.textContent = pickedColor;
	// giving squares different colors 
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.display = 'block';
		randomColorCode[i] ? squares[i].style.background = randomColorCode[i] : squares[i].style.display = 'none';
	}
	resetColors.textContent = 'New Colors';
	statusDisplay.textContent = '';
	h1.style.background = 'steelblue';
}

// getting 6 or 3 random rgb colors, each of them as in rgb format
function generateRandomColors(num){
	//create an array to hold 6 or 3 random colors
	var arr = [];
	// generate random colors
	for (var i = 0; i < num; i++) {
		//push them into arr
		arr.push(randomRGB());
	}
	// return that array
	return arr;
}

function randomRGB(){
	// generate rgb colors
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	// return as a rgb format
	return "rgb("+r+", "+g+", "+b+")";
}

// pick one color randomly to ask for from the color palette generated
function pickColor(num){
	return randomColorCode[Math.floor(Math.random() * num)];
}

// color all squares when matched
function colorAll(clickedSquare){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = clickedSquare;
	}
	h1.style.background = clickedSquare;
}

