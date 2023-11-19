//register service worker
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register("static/serviceworker.js", { scope: "/" });
}

// variable
let boxCount = 0, animateStore = new Array();
let imageFile = document.querySelector('#image');
let hideFiles = document.querySelector('#hidefile');
let encoding = false, encodemsg= false;
let createdImageFile;
var requestTerminal, responseText;

// make the first terminal on site load
window.onload = () => {
	setTimeout(()=> {
		new Terminal(`Cryptic_${boxCount++}`).drawMiniBox();
		
	}, 1000);
}

/* ---------------key short cuts---------------- */
addEventListener('keydown', (e)=>{
	let key = e.key;
	if(e.altKey && key == 'n' || key == 'N') {
		new Terminal(`Cryptic_${boxCount++}`).drawMiniBox();
	}
});

/* -----------------create image (incomplete) ----------------- */
let canvas = document.querySelector("#encodedCan");
let ctx = canvas.getContext("2d");

// function sumDigits(n) {
// 	if (n < 10) return n
// 	return sumDigits(n % 10 + sumDigits(Math.floor(n / 10)));
// }

// function createImage(self, size) {
// 	let sizes = size.split("x").map(z=> parseInt(z));
// 	const arr = new Uint8ClampedArray(4*sizes[0]*sizes[1]);
// 	for (let i = 0; i < arr.length; i += 4) {
// 		arr[i + 0] = 255;    // R value
// 		arr[i + 1] = 255;    // G value
// 		arr[i + 2] = 255;    // B value
// 		arr[i + 3] = 255;    // A value
// 	}

// 	ctx.putImageData(new ImageData(arr, sizes[0], sizes[1]), 0, 0);
// 	canvas.toBlob(async (blob) => {
// 		let temparr = await blob.arrayBuffer();
// 		const typedArray = new Uint8Array(temparr);
// 		createdImageFile = new File([...arr], "createdImage.png", {type:"image/png"});
// 		//console.log(createdImageFile)
// 		hide(self);
// 	});
// 	let a = document.createElement('a');
// 	a.href = canvas.toDataURL("image/png");
// 	a.setAttribute("download", "download");
// 	a.click();
// 	a.remove();
// }

/* ------------------file read/hide/unhide/downlaod--------------------*/

function download(file, filename) {
	const fileUrl = URL.createObjectURL(file);
	let a = document.createElement('a');
	a.setAttribute("download", filename);
	a.setAttribute("href", fileUrl);
	a.click();
	a.remove();
}
async function fileSendRequest(requestURL, bodyData) {
	let res = await fetch(requestURL, {
		method: "post",
		headers: {
			//'Content-Type': 'application/json'
			'enctype': "multipart/form-data"
		},
		body: bodyData
	});

	// if response is an error, exit the process
	if(res.status == 404) {
		responseText.value += 'hmmm.. there was some error, make sure image size is correct or change the filenames or contact me on github ;P';
		responseText.innerHTML = responseText.value;
		responseText.style.height = (responseText.scrollHeight)+"px";
		
		// move input to next line
		requestTerminal.commandInput();
		return 0;
	}
	
	// move input to next line
	requestTerminal.commandInput();
	return res;
}

let hide = async ()=> {
	let formData = new FormData();

	// if user want to hide text message instead of a file :: encodemsg === true
	// encodemsg is just another txt file but refrencing it as a text message
	if(!encodemsg) {
		formData.append('hide', hideFiles.files[0]);
	}else{
		formData.append('hide', encodemsg);
	}

	// if user gives his own image else create a new image and use it
	if(imageFile.files[0]) {
		formData.append('img', imageFile.files[0]);
	}else {
		formData.append('img', createdImageFile);
	}

	// reset the file input fields and variables
	hideFiles.value = '', imageFile.value = '', encoding = false, encodemsg = false;

	// send the files to the server
	let res = await fileSendRequest("/hide", formData);
	if (!res) return 1;

	// get the image file and send a "get" request to server to as ack and delete the file
	let hiddenImgFile = await res.blob();
	res = await fetch("/hide");

	// download the image file
	download(hiddenImgFile, "hidden.png");
}

let unnhide = async ()=> {
	let formData = new FormData();

	// append the "hidden" img file
	formData.append('img', imageFile.files[0]);

	// reset the img input field
	imageFile.value = '';

	// send the file to server
	let res = await fileSendRequest("/unhide", formData);
	if (!res) return 1;

	// store response from server
	let hiddenFile = await res.blob();

	// get the image file and send a "get" request to server to get the extension and delete the file
	res = await fetch("/unhide");
	let ext = await res.text();

	// download the file
	download(hiddenFile, "decoded"+ext);
}


function startProcess(r, bufferText) {
	requestTerminal = r;
	responseText = bufferText;
	imageFile.click();
}
imageFile.addEventListener('change', (e) => {
	if(!imageFile.files.length) return 0;

	// if it's an encoding or decoding command
	if(encoding) {
		hide();
	}else{
		unnhide();
	}
});