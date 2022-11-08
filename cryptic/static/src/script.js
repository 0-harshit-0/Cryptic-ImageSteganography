if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register("static/serviceworker.js");
}

let boxCount = 0, animateStore = new Array();
let imageFile = document.querySelector('#image');
let hideFiles = document.querySelector('#hidefile');
let encoding = false, encodemsg= false;
let createdImageFile;

window.onload = () => {
	new Terminal(`Cryptic_${boxCount++}`).drawMiniBox();
}
/* ---------------key short cuts---------------- */
addEventListener('keydown', (e)=>{
	let key = e.key;
	if(e.altKey && key == 'n' || key == 'N') {
		new Terminal(`Cryptic_${boxCount++}`).drawMiniBox();
	}
});

/* -----------------create image----------------- */
let canvas = document.querySelector("#encodedCan");
let ctx = canvas.getContext("2d");

function sumDigits(n) {
	if (n < 10) return n
	return sumDigits(n % 10 + sumDigits(Math.floor(n / 10)));
}

function createImage(self, size) {
	let sizes = size.split("x").map(z=> parseInt(z));
	const arr = new Uint8ClampedArray(4*sizes[0]*sizes[1]);
	for (let i = 0; i < arr.length; i += 4) {
		arr[i + 0] = 255;    // R value
		arr[i + 1] = 255;    // G value
		arr[i + 2] = 255;    // B value
		arr[i + 3] = 255;    // A value
	}

	ctx.putImageData(new ImageData(arr, sizes[0], sizes[1]), 0, 0);
	canvas.toBlob(async (blob) => {
		let temparr = await blob.arrayBuffer();
		const typedArray = new Uint8Array(temparr);
		createdImageFile = new File([...arr], "createdImage.png", {type:"image/png"});
		//console.log(createdImageFile)
		hide(self);
	});
	let a = document.createElement('a');
	a.href = canvas.toDataURL("image/png");
	a.setAttribute("download", "download");
    a.click();
    a.remove();
}

/* ------------------file read--------------------*/
let hide = async (requestTerminal)=> {
	let formData = new FormData();
	if(!encodemsg) {
		formData.append('hide', hideFiles.files[0]);
	}else{
		formData.append('hide', encodemsg);
	}
	if(imageFile.files[0]) {
		formData.append('img', imageFile.files[0]);
	}else {
		formData.append('img', createdImageFile);
	}
	hideFiles.value = '', imageFile.value = '';

	let res = await fetch("/hide", {
		method: 'post',
		headers: {
			//'Content-Type': 'application/json'
			'enctype': "multipart/form-data"
		},
		body: formData
	});
	requestTerminal.commandInput();

	if(res.status == 404) return 0;
	let json = await res.blob();
	res = await fetch("/hide");

	const imageObjectURL = URL.createObjectURL(json);
	let a = document.createElement('a');
	a.setAttribute("download", "hidden.png");
	a.setAttribute("href", imageObjectURL);
	a.click();
	a.remove();
	encoding = false;
	encodemsg = false;
}

let unnhide = async (requestTerminal)=> {
	let formData = new FormData();
	formData.append('img', imageFile.files[0]);
	imageFile.value = '';

	let res = await fetch("/unhide", {
		method: 'post',
		headers: {
			//'Content-Type': 'application/json'
			'enctype': "multipart/form-data"
		},
		body: formData
	});
	requestTerminal.commandInput();
	if(res.status == 404) return 0;

	let json = await res.blob();
	res = await fetch("/unhide");
	let ext = await res.text();

	const imageObjectURL = URL.createObjectURL(json);
	let a = document.createElement('a');
	a.setAttribute("download", "decoded"+ext);
	a.setAttribute("href", imageObjectURL);
	a.click();
	a.remove();
}
var tmp;
function startProcess(r) {
	tmp = r;
	imageFile.click();
}
imageFile.addEventListener('change', (e) => {
	if(!imageFile.files.length) return 0;
	if(encoding) {
		hide(tmp);
	}else{
		unnhide(tmp);
	}
});