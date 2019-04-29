// select elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('.volume');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const fullscreen = document.querySelector('.fullscreen');


// defining functions
function togglePlay(){
	// toggle for video play and pause
	const playOrPause = video.paused ? 'play' : 'pause';
	video[playOrPause]();
	// toggle for icon change when play or pause
	playOrPause === 'play' ? toggle.textContent = '❚ ❚' : toggle.textContent = '►';
}

function skip(){
	// add or substract the skip time to current time of video
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeChange(){
	// Change the video's range value
	video[this.name] = this.value;
}

function handleProgress(){
	// convert video's current time into percentage
	const percent = (video.currentTime / video.duration) * 100;
	// append it to the flexBasis property (CSS)
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function handleFullScreen(){
	 video.requestFullscreen();
}

// add event listeners
// Play or Pause events(On video click)
video.addEventListener('click', togglePlay);
// 					   (On button click)
toggle.addEventListener('click', togglePlay);

// skipping video back and forth
skipButtons.forEach(button => button.addEventListener('click', skip));

// volume or fast forward events
ranges.forEach(range => range.addEventListener('change', handleRangeChange));

// Change progress wrt time
video.addEventListener('timeupdate', handleProgress);

// event on clicking progress bar
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

// add full screen event
fullscreen.addEventListener('click', handleFullScreen);
