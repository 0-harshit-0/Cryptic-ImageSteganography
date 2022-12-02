class Terminal {
	constructor(name="Cryptic") {
		this.n = name;
		this.historyCommand = new Array();
		this.div = document.createElement('div');
		this.div.setAttribute('class', `terminalCont terminalCont${this.n}`);
		this.section = document.createElement('section');
		this.section.setAttribute('class', `miniboxes miniboxes${this.n}`);
	}
	activeTerminal() {
		this.div.addEventListener('mousedown', ()=> {
			if([...this.div.classList].includes('activeTerminalCont')) return 0;

			this.div.classList.add('activeTerminalCont');
			this.section.classList.add('activeMiniBox');
			if(document.querySelectorAll('.terminalCont').length == 1) return;
			document.querySelectorAll('.activeTerminalCont').forEach(z=>{
				if(z == this.div) return;
				z.classList.remove('activeTerminalCont');
			});
			document.querySelectorAll('.activeMiniBox').forEach(z=>{
				if(z == this.section) return;
				z.classList.remove('activeMiniBox');
			});
		});
	}
	drag() {
		let drag = false;
		let pos3, pos4, pos1, pos2;
		this.div.querySelector(`.terminalHeadBar`).addEventListener("mousedown", (e)=> {
		    drag = true;
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		});
		addEventListener("mouseup", ()=> {
		    drag = false;
		});
		addEventListener("mousemove", (e)=> {
		    if (drag) {
		        pos1 = pos3 - e.clientX;
		        pos2 = pos4 - e.clientY;
		        pos3 = e.clientX;
		        pos4 = e.clientY;

		        if(this.div.offsetTop - pos2 < 0) return;

		        this.div.style.left = (this.div.offsetLeft - pos1) + "px";
		        this.div.style.top = (this.div.offsetTop - pos2) +"px";
		    }
		});
	}
	maximize() {
		document.querySelector(`.miniName${this.n}`).addEventListener('click', ()=>{
			if(getComputedStyle(this.div).display == 'grid') {
				if([...this.div.classList].includes('activeTerminalCont')) return 0;
				this.div.classList.add('activeTerminalCont');
				this.section.classList.add('activeMiniBox');
				if(document.querySelectorAll('.terminalCont').length == 1) return;
				document.querySelectorAll('.activeTerminalCont').forEach(z=>{
					if(z == this.div) return;
					z.classList.remove('activeTerminalCont');
				});
				document.querySelectorAll('.activeMiniBox').forEach(z=>{
					if(z == this.section) return;
					z.classList.remove('activeMiniBox');
				});
				return;
			}
			this.div.style.display = 'grid';
			setTimeout(()=>{
				this.div.style.top = this.div.offsetTop-25+"px";
				this.div.style.opacity = '1';
			},100);
			setTimeout(()=>{
				this.div.style.transition = 'none';
			}, 400);
		});
	}
	minimize() {
		this.div.querySelector(`.terminalContdash${this.n}`).addEventListener('click', ()=>{
			this.div.style.transition = 'top .3s ease, opacity .3s ease';
			this.div.style.top = this.div.offsetTop+25+'px';
			this.div.style.opacity = '0';
			setTimeout(()=> {
				this.div.style.display = 'none';
			}, 300);
		});
	}
	close(crossBtn){
		crossBtn.addEventListener('click', ()=>{
			this.div.remove();
			this.section.remove();
		});
	}
	commandInput(input='') {
		this.div.querySelector(`.terminal`).innerHTML += `<label></label><textarea class="commandName"></textarea>`;
		
		let commandTextareaList = [...this.div.querySelector(`.terminal`).querySelectorAll(`.commandName`)];
		let newCommandTextarea = commandTextareaList.pop();
		newCommandTextarea.value = `root@${this.n.toLowerCase()}:~# ${input}`;
		
		newCommandTextarea.addEventListener('input', ()=> {
			newCommandTextarea.style.height = (newCommandTextarea.scrollHeight)+"px";
		});

		setTimeout(()=>{newCommandTextarea.focus();}, 100);

		//disable other inputs
		if (commandTextareaList.length) {
			commandTextareaList[commandTextareaList.length-1].disabled = true;
			commandTextareaList[commandTextareaList.length-1].removeEventListener('input', ()=> {});
		}
	}
	input(file, img) {
		let arrowCount = 0, dimension = 0;
		this.div.querySelector(`.terminal`).addEventListener('keydown', (e)=> {

			// console.log(e.key)
			if(e.altKey && e.key == 'c') {
				this.div.remove();
				this.section.remove();
			}
			if(e.shiftKey && e.key == 'Enter'){
				let iele = [...this.div.querySelectorAll(`.commandName`)].pop();
				iele.value += '\t';
			}else if(e.key == 'Enter'){
				arrowCount = 0;
				let iele = [...this.div.querySelectorAll(`.commandName`)].pop();

				let temp;
				if(iele.value.indexOf("(y/n):")>0) {
					temp = iele.value.slice(0, iele.value.indexOf("-"))+iele.value.slice(iele.value.indexOf("(y/n):")+7);
				}else {
					temp = iele.value;
				}
				let command = temp.split(' ').splice(1);
				this.historyCommand.unshift(command.join(' '));

				//command filter---------
				temp = command.shift();
				if (temp == 'exit') {
					this.div.remove();
					this.section.remove();
				}
				if (temp == "gui") {
					window.location.assign("/GUI");
					return 1;
				}
				if(temp != 'Cryptic' && temp != 'cryptic') {
					iele.value += ("\ninvalid command");

					iele.innerHTML = iele.value;
					iele.style.height = (iele.scrollHeight)+"px";
					
					//create new command input element
					this.commandInput();
					return 0;
				}
				temp = command.shift();
				switch (temp) {
					case '-h':
						iele.value += `\n\n## Shortcuts:\n> Shift+Enter to create a new line.\n> Alt+n or Alt+N to create a new terminal.\n> Alt+c to close the terminal.\n> Use a mouse to hold and drag the terminal.\n\n## Misc:\n> gui to use basic theme.\n\n## Flags:\n> -h  for help.\n> -e to hide files in an image.\n> -em to hide text message in an image.\n> -d to reveal the hidden files/messages from an image.\n\n## Hide files with: cryptic -e\n> Once the hiding process is complete, a new Image file will start downloading automatically.\n\n## Hide messages with: cryptic -em [text message here]\n> Once the hiding process is complete, a new Image file will start downloading automatically.\n\n## Reveal hidden files with: cryptic -d\n> After decoding the files, downloaded will begin automatically.\n\n## Close terminal: exit\n\n## Help message: cryptic -h\n`;
						
						iele.innerHTML = iele.value;
						iele.style.height = (iele.scrollHeight)+"px";

						//create new command input element
						this.commandInput();
						break;
					case '-em':
						encoding = true;
						let msgTxt = command.shift();
						var myblob = new Blob([msgTxt], {
						    type: 'text/plain'
						});
						encodemsg = new File([myblob], "mess.txt");
						dimension = find(encodemsg.size);
						setTimeout(()=> {
							iele.value += `Would you like to insert image of dimension (${dimension}) or higher? (y/n): `;
							iele.style.height = (iele.scrollHeight)+"px";
						}, 100);
						break;
					case '-e':
						encoding = true;
						file.click();
						file.addEventListener("change", ()=> {
							dimension = find(file.files[0].size);
							iele.value += `Would you like to insert image of dimension (${dimension}) or higher? (y/n): `;
							iele.style.height = (iele.scrollHeight)+"px";
						});
						break;
					case 'y':
						if(!encoding) return 0;
						
						setTimeout(()=>{
							iele.value += 'hiding file in the image...';
							iele.innerHTML = iele.value;
							iele.style.height = (iele.scrollHeight)+"px";
						}, 100);
						startProcess(this, iele);
						break;
					case 'n':
						if(!encoding) return 0;

						setTimeout(()=>{
							iele.value += 'no image file selected...';
							iele.innerHTML = iele.value;
							iele.style.height = (iele.scrollHeight)+"px";
						}, 100);
						//this.commandInput();
						createImage(this, dimension);
						break;
					case '-d':
						encoding = false;

						setTimeout(()=>{
							iele.value += 'extracting file from the image...';
							iele.innerHTML = iele.value;
							iele.style.height = (iele.scrollHeight)+"px";
						}, 100);
						startProcess(this, iele);
						break;
					default:
						iele.value += `\ninvalid flag, try this: "Cryptic -h"`;
						
						iele.innerHTML = iele.value;
						iele.style.height = (iele.scrollHeight)+"px";

						//create new command input element
						this.commandInput();
						break;
				}
				
			}else if(e.key == 'ArrowUp') {
				e.preventDefault();
				let iele = [...this.div.querySelectorAll(`.commandName`)].pop();
				iele.value = `root@${this.n.toLowerCase()}:~# ${this.historyCommand[arrowCount++]||''}`;
			}else if(e.key == 'ArrowDown') {
				e.preventDefault();
				let iele = [...this.div.querySelectorAll(`.commandName`)].pop();
				iele.value = `root@${this.n.toLowerCase()}:~# ${this.historyCommand[--arrowCount]||''}`;

			}
		});
	}
	draw() {
		this.div.innerHTML = `
		<div class="terminalHeadBar">
			<span></span>
			<span>${this.n}</span>
			<section class="terminalHeadBarBtnCont">
				<svg class="terminalContdash${this.n}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
				  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
				</svg>
				<!--<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
				  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
				</svg>-->
				<svg class="terminalContcross${this.n}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
				  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</section>
		</div>
		<div class="terminal">
		</div>
		`;
		document.querySelector("#root").append(this.div);
	
		//activate the current window----
		this.div.classList.add('activeTerminalCont');
		this.section.classList.add('activeMiniBox');
		document.querySelectorAll('.activeTerminalCont').forEach(z=>{
			if(z == this.div) return;
			z.classList.remove('activeTerminalCont');
		});
		document.querySelectorAll('.activeMiniBox').forEach(z=>{
			if(z == this.section) return;
			z.classList.remove('activeMiniBox');
		});

		this.activeTerminal();
		this.drag();
		this.minimize();
		this.close(this.div.querySelector(`.terminalContcross${this.n}`));
		this.commandInput('Cryptic -h');
		this.input(document.querySelector('#hidefile'), document.querySelector('#image'));
	}
	drawMiniBox() {
		
		this.section.innerHTML = `
		<span></span>
		<span class='miniName${this.n}'>${this.n}</span>
		<svg class='miniCross${this.n}' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 14">
		  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
		</svg>
		`;
		document.querySelector(".bottomCont").append(this.section);

		this.maximize();
		this.close(this.section.querySelector(`.miniCross${this.n}`));

		this.draw();
		return this;
	}
}

