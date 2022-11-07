const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


// get the video 
function getVideo(){
	navigator.mediaDevices.getUserMedia({video:true, audio:false})
	.then(mediaStream => {
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

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);

		// take the pixels
		let pixels = ctx.getImageData(0, 0, width, height);
		// apply the affect

		pixels = greenScreen(pixels);
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);

		// ctx.globalAlpha = 0.1;

		//  put them back
		ctx.putImageData(pixels, 0, 0);
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


function redEffect(pixels){
	for (var i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i] += 100;			//red
		pixels.data[i + 1] -= 50;		//green
		pixels.data[i+ 2] *= 0.5;		//blue
	}
	return pixels;
}

function rgbSplit(pixels){
	for (var i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i - 150] = pixels.data[i];			//red
		pixels.data[i + 100] = pixels.data[i + 1];		//green
		pixels.data[i - 700] = pixels.data[i + 2];		//blue
	}
	return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
getVideo();

video.addEventListener('canplay', getVideoOnCanvas);