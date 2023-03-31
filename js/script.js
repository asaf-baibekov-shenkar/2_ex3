class MemoryGame {
	constructor() {
		this.squares = document.querySelector("#squares");
		this.button = document.querySelector("#button");
		this.numSquares = 0;
		this.lettersArray = [];
		this.init();
	}

	init() {
		this.createSquares();
		this.addEventListeners();
	}

	createSquares() {
		let size = 80;
		this.lettersArray = this.generateLettersArray();
		for (let i = 0; i < this.numSquares; i++) {
			const square = document.createElement("div");
			square.classList.add("square");
			square.style.width = size + "px";
			square.style.height = size + "px";
			square.dataset.index = i;
			this.squares.appendChild(square);
			size += 20;
		}
	}
	
	generateLettersArray() {
		let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (this.numSquares > 26) {
			letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		}
		const lettersArray = [];
		for (let i = 0; i < this.numSquares / 2; i++) {
			const index = Math.floor(Math.random() * letters.length);
			const letter = letters.charAt(index);
			letters = letters.slice(0, index) + letters.slice(index + 1);
			lettersArray.push(letter, letter);
		}
		if (this.numSquares % 2 !== 0) {
			lettersArray.pop();
		}
		return lettersArray.sort(() => Math.random() - 0.5);;
	}
	
	getLetter(square) {
		const index = parseInt(square.dataset.index);
		return this.lettersArray[index];
	}

	showLetter(square) {
		const index = parseInt(square.getAttribute('data-index'));
		square.textContent = this.lettersArray[index];
		console.log(this.lettersArray[index]);
		square.classList.add("active");
		square.style.fontSize = (parseInt(square.style.width) / 2) + "px";
	}
	
	addEventListeners() {
		this.button.addEventListener("click", () => {
			this.numSquares += 3;
			this.resetGame();
		});

		this.squares.addEventListener("click", (event) => {
			if (event.target.classList.contains("square") &&
				!event.target.classList.contains("matched") &&
				!event.target.classList.contains("active")) {
				this.showLetter(event.target);
				const activeSquares = document.querySelectorAll(".active");
				if (activeSquares.length === 2) {
					this.checkMatch(activeSquares);
				}
			}
		});
	}

	resetGame() {
		this.squares.innerHTML = "";
		this.createSquares();
	}

	checkMatch(activeSquares) {
		let firstLetter = this.lettersArray[activeSquares[0].dataset.index]
		let secondLetter = this.lettersArray[activeSquares[1].dataset.index]
		if (firstLetter === secondLetter) {
			activeSquares.forEach((square) => {
				square.classList.add("matched");
				square.classList.remove("active");
			});
		} else {
			setTimeout(() => {
				activeSquares.forEach((square) => {
					square.textContent = "";
					square.classList.remove("active");
				});
			}, 300);
		}
	}
}

window.onload = () => {
	new MemoryGame();
}
