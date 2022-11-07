let countDown; 
const displayLeftTime = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');
const buttonEl = document.querySelectorAll('[data-time]');

function timer(seconds){
	clearInterval(countDown);
	const now = Date.now();
	const then = now + seconds * 1000;	

	displayTimeLeft(seconds);
	displayTimeEnd(then);
	countDown = setInterval(function(){
		const secondsLeft = Math.round((then - Date.now()) / 1000);	
		
		// stop when reaches 0
		if(secondsLeft < 0) {
			clearInterval(countDown);
			return;
		}
		displayTimeLeft(secondsLeft);
		
	}, 1000);
}

function displayTimeLeft(seconds){
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const displayTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	displayLeftTime.textContent = displayTime;
	document.title = displayTime;
}

function displayTimeEnd(timestamp){
	const endDate = new Date(timestamp);
	const hours = endDate.getHours();
	const mins = endDate.getMinutes();
	displayEndTime.textContent = `Will be back at ${hours}:${mins}`
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}


buttonEl.forEach(el => el.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const secs = this.minutes.value * 60;
	timer(secs);
	this.reset();
})
