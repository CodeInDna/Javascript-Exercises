const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


// get the video 
function getVideo(){
	navigator.mediaDevices.getUserMedia({video:true, audio:false})
	.then(mediaStream => {
		console.log(mediaStream);
		video.srcObject = mediaStream;
		video.play();
	})
	.catch(err=>{
		console.error('Something Wrong!', err);
	})
}

function getVideoOnCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;
	console.log(width, height);

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
	}, 16);
}

function takePhoto(){
	// play the click sound
	snap.currentTime=0;
	snap.play();

	// get the data from the canvas 
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'cute');
	link.innerHTML = `<img src="${data}" alt="cute">`;
	strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', getVideoOnCanvas);