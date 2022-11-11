let ss = document.querySelector('#startScreen');
let ssTxt = document.querySelector("#startScreen span");
let blink = document.querySelector(".blink");
let txt = "cryptic", i=0;
let typesound = new Audio();
typesound.src="static/assets/typeaudio.mp3";

ssTxt.onclick = () =>{
	//getDimensions(mandel);
	ssTxt.classList.remove("notActive");
	blink.style.display = 'initial';
	ssTxt.innerText = '';

	typesound.play();

	inter = setInterval(()=> {
		if(!txt.charAt(i)) {clearInterval(inter);return 1;}
		ssTxt.innerText += txt.charAt(i);
		i++;
	}, 150);

	setTimeout(()=>{
		ss.remove();
	}, 1500);
}



//---------------------cnavas---------------------------


let bgcanvas = document.querySelector('#canvas');
let bgctx = bgcanvas.getContext('2d');

let s = new Shapes(bgctx), timeout = false;
let animateInter, store = new Array(), index = 0;
let scale = 1;


function changeDimensions(callback) {
	bgctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
	bgcanvas.width = window.innerWidth*scale;
	bgcanvas.height = window.innerHeight*scale;

	if(callback) callback(true);
}
addEventListener('resize', function(e) {
	clearTimeout(timeout);

	timeout = setTimeout(()=> {
		cancelAnimationFrame(animateInter);
		changeDimensions(animatio);
	}, 500);
});
// bgcanvas responssive over------------

class Stars {
  constructor(x, y, vx, vy, radius) {
    this.pos = new Vector2D(x, y);
    this.vel = new Vector2D(vx, vy);
    this.r = radius;
    this.color = "rgb(255, 255, 255)";
  }
  draw() {
    s.ellipse("",this.pos.x, this.pos.y, this.r);
    s.fill("", this.color);
  }
  update() {
    this.pos = Vector2D.add(this.pos, this.vel);
    this.draw();
  }
}

let starStore = new Array();
(() => {
  for (let i = 0; i < 1000; i++) {
    let radius = Math.random();
    let x = Math.random() * (innerWidth - radius * 2);
    let y = Math.random() * (innerHeight - radius * 2);
    let dx = (Math.random() - 0.5) / 5;
    let dy = (Math.random() - 0.5) / 5;
    starStore.push(new Stars(x, y, dx, dy, radius));
  }
})();

function animatio() {
  //bgctx.fillStyle = 'rgba(0, 0, 0, 1)';
  //bgctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  bgctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);


  for (let k = starStore.length-1; k >= 0; k--) {
    starStore[k].update();
    if (starStore[k].pos.y >= bgcanvas.height || starStore[k].pos.y < 0 ||
        starStore[k].pos.x >= bgcanvas.width || starStore[k].pos.x <= 0) {
      starStore.splice(k, 1);
    }
  }

  requestAnimationFrame(animatio);
}

window.onload = () => {
  setTimeout(()=>{changeDimensions(animatio);}, 2000);
}