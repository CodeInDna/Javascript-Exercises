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


getVideo();

video.addEventListener('canplay', getVideoOnCanvas);