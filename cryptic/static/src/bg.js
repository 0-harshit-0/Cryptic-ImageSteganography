let ss = document.querySelector('#startScreen');
let ssTxt = document.querySelector("#startScreen span");
let blink = document.querySelector(".blink");
let txt = "cryptic", i=0;
let typesound = new Audio();
typesound.src="static/assets/typeaudio.mp3";

ssTxt.onclick =()=>{
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


/*
---------------------cnavas---------------------------


let bgcanvas = document.querySelector('#canvas');
let bgctx = bgcanvas.getContext('2d');
let s = new Shapes(bgctx), timeout = false;
let wh = Math.max(innerWidth, innerHeight);
bgcanvas.width = wh;
bgcanvas.height = wh;
function getDimensions(callback) {
	s.clear(new Vector2D(), bgcanvas.width, bgcanvas.height);
	bgcanvas.width = wh;
	bgcanvas.height = wh;

	if(callback) callback(true);
}
addEventListener('resize', function(e) {
	clearTimeout(timeout);
	timeout = setTimeout(()=> {
		cancelAnimationFrame(id);
		getDimensions(animate);
	}, 500);
});
// bgcanvas responssive comp------------
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
let a, b, n=0;
const maxiterations = 50;
const magnify = 4;
function mandel(tri=false) {
	if (tri) {
		mt=true;
		m=false;
	}else {
		mt=false;
		m=true;
	}
	c=false;
	t=false;
	bgctx.clearRect(0,0,bgcanvas.width, bgcanvas.height);

	for (var x = 0; x < wh; x += 1) {
		for (var y = 0; y < wh; y += 1) {
			
			a = Vector2D.map(x, 0, wh, -magnify, magnify);
			b = Vector2D.map(y, 0, wh, -magnify, magnify);
			n = 0;
			if (a && b) {
				var ca = a;//x
				var cb = b;//y

				while(n < maxiterations && Math.sqrt(a*a + b*b) <= 15) {
					//console.log(1)
					
					if (tri) {
						let aa = a*a - b*b;
						let bb = -2*a*b;
						a = aa + ca;
						b = bb + cb;
					}else {
						let aa = a*a - b*b;
						let bb = 2*a*b;
						a = aa + ca;
						b = bb + cb;
					}
									
			        n++;
				}
				fc = hexToRgb('#232121');
	      		if (n == maxiterations) {
			        fill = `transparent`;
			        
			    }else if (n < maxiterations) {
			    	fill = `rgb(${fc.r+(n*10)},${fc.g+(n*10)},${fc.b+(n*10)})`;
			    }

	            s.rect({x:x, y:y, w:1});
	            s.fill({c:fill});
	            //console.log(fill)
	        }
		}
	}
}
let animateInter;
let store = new Array(), index = 0;


*/