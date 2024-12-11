var table = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

var score = 0;


	
function writeTable(){
	$(() => {
		var background_color = "#EEE4DA";
		var text_color = "#776E65";
		for (i = 0; i < 4; i++) { 
			for (j = 0; j < 4; j++) {
				// Background-color:
				switch (table[i][j]){
					case 0:
					background_color = "#CDC1B4";
					text_color = "#CDC1B4";
					break;
					case 2:
					background_color = "#EEE4DA";
					text_color = "#776E65";
					break;
					case 4:
					background_color = "#EDE0C8";
					text_color = "#776E65";
					break;
					case 8:
					background_color = "#F2B179";
					text_color = "#F9F6F2";
					break;
					case 16:
					background_color = "#F59563";
					text_color = "#F9F6F2";
					break;
					case 32:
					background_color = "#F67C5F";
					text_color = "#F9F6F2";
					break;
					case 64:
					background_color = "#F65E3B";
					text_color = "#F9F6F2";
					break;
					case 128:
					background_color = "#EDCF72";
					text_color = "#F9F6F2";
					break;
					case 256:
					background_color = "#EDCC61";
					text_color = "#F9F6F2";
					break;
					case 512:
					background_color = "#EDC850";
					text_color = "#F9F6F2";
					break;
					case 1024:
					background_color = "#EDC53F";
					text_color = "#F9F6F2";
					break;
					case 2048:
					background_color = "#EDCF72";
					text_color = "#F9F6F2";
					break;
					case 4096:
					background_color = "#3C3A32";
					text_color = "#F9F6F2";
					break;
					case 8192:
					background_color = "#3C3A32";
					text_color = "#F9F6F2";
					break;
					default:
					background_color = "#3C3A32";
					text_color = "#F9F6F2";
					break;
				}
				$("div[data-col="+i+"][data-row="+j+"]").html(table[i][j]);
				$("div[data-col="+i+"][data-row="+j+"]").css("background-color",background_color);
				$("div[data-col="+i+"][data-row="+j+"]").css("color",text_color);
				
			}
		}
	});
}

function checkBlank(){
	var blank = false;
	for (i = 0; i < 4; i++) { 
		for (j = 0; j < 4; j++) {
			if (table[i][j] == 0) {
				blank = true;
			}
		}
	}
	return blank;
}

function updateScore() {
	$('#score').html("Score: " + score);
}

function gameOver(){
	if (!checkBlank()) {
		// check if 2 same number are nearby
		move = false;
		for (i = 0; i < 4; i++) { 
			for (j = 0; j < 3; j++) {
				if (table[i][j] == table[i][j+1]) {
					move = true;
				}
			}
		}
		for (i = 0; i < 3; i++) { 
			for (j = 0; j < 4; j++) {
				if (table[i][j] == table[i+1][j]) {
					move = true;
				}
			}
		}
		if (!move) {
			$('#output').html('GAME OVER');
		}
	}
}

function endAction(move) {
	if (move>0) {
		newDice();
		writeTable();
	} else {
		$('#output').html('No move');
	}
	gameOver();
}

function newDice() {
	score = 0;
	updateScore();
	if (checkBlank()==true) {
		var x = 0;
		var y = 0;
		x = Math.floor(Math.random() * 4);
		y = Math.floor(Math.random() * 4);
		while (table[x][y] != 0) {
			x = Math.floor(Math.random() * 4);
			y = Math.floor(Math.random() * 4);
		}
		table[x][y] = 2*(1+Math.floor(Math.random() * 2));
	} else {
		$('#output').html('No more space');
	}
}

function moveLeft() {
	$('#output').html('Left');
	var move = 0;
	for (i = 0; i < 4; i++) {
		for (j = 1; j < 4; j++) { 
			if (table[i][j] != 0) {
				k = j;
				// Make the run till hit last column or a number
				while ((k>0) && (table[i][k-1]==0)) {
					k--;
					move++;
				}
				if (k>0) {
					// If next column is a number and have same value
					if ((table[i][k-1] == table[i][j])) {
						table[i][k-1] = 2*table[i][j];
						score += 2*table[i][j];
						updateScore();
						table[i][j] = 0;
						move++;
					}
				}
				if (k!=j) {
					table[i][k] = table[i][j];
					table[i][j] = 0;
				}
			}
		}
	}
	endAction(move);
}

function moveUp(){
	$('#output').html('Up');
	var move = 0;
	for (j = 0; j < 4; j++) {
		for (i = 1; i < 4; i++) { 
			if (table[i][j] != 0) {
				k = i;
				while ((k>0) && (table[k-1][j]==0)) {
					k--;
					move++;
				}
				if (k>0) {
					if ((table[k-1][j] == table[i][j])) {
						table[k-1][j] = 2*table[i][j];
						score += 2*table[i][j];
						updateScore();
						table[i][j] = 0;
						move++;
					}
				}
				if (k!=i) {
					table[k][j] = table[i][j];
					table[i][j] = 0;
				}
			}
		}
	}
	endAction(move);
}

function moveRight(){
	$('#output').html('Right');
	var move = 0;
	for (i = 0; i < 4; i++) {
		for (j = 3; j >= 0; j--) { 
			if (table[i][j] != 0) {
				k = j;
				while ((k<3) && (table[i][k+1]==0)) {
					k++;
					move++;
				}
				if (k<3) {
					if ((table[i][k+1] == table[i][j])) {
						table[i][k+1] = 2*table[i][j];
						score += 2*table[i][j];
						updateScore();
						table[i][j] = 0;
						move++;
					}
				}
				if (k!=j) {
					table[i][k] = table[i][j];
					table[i][j] = 0;
				}
			}
		}
	}
	endAction(move);
	
}

function moveDown(){
	$('#output').html('Down');
	var move = 0;
	for (j = 0; j < 4; j++) {
		for (i = 3; i >= 0; i--) { 
			if (table[i][j] != 0) {
				k = i;
				while ((k<3) && (table[k+1][j]==0)) {
					k++;
					move++;
				}
				if (k<3) {
					if ((table[k+1][j] == table[i][j])) {
						table[k+1][j] = 2*table[i][j];
						score += 2*table[i][j];
						updateScore();
						table[i][j] = 0;
						move++;
					}
				}
				if (k!=i) {
					table[k][j] = table[i][j];
					table[i][j] = 0;
				}
			}
		}
	}
	endAction(move);
}

$(() => {
	for(j = 0; j < 4; j++) {
		for(i = 0; i < 4; i++) {
			$(".grid-container").append("<div class = grid-item data-row=" + i + " data-col=" + j + "></div>");
	}}
	
	newDice();
	newDice();
	updateScore();
	writeTable();

	$("button").click(() => {
		table = [[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]];
		newDice();
		newDice();
		writeTable();
	});
		
    $('html').keydown((e) => {
		$('#output').html(e.which);
		switch (e.which) {
			// Up: 38, down: 40, left: 37, right: 39;
			case 37: // Left
				moveLeft();
				break;
			case 38: // Up
				moveUp();
				break;
			case 39: // Right
				moveRight();
				break;
			case 40: // Down
				moveDown();
				break;
		}
		
    });

	let startY = 0;
    let endY = 0;
	let startX = 0;
    let endX = 0;

    $('body').on('touchstart', (e) => {
        startX = e.originalEvent.touches[0].clientX;
		startY = e.originalEvent.touches[0].clientY;
		e.preventDefault();
    });

    $('body').on('touchmove', (e) => {
        endX = e.originalEvent.touches[0].clientX;
		endY = e.originalEvent.touches[0].clientY;
		e.preventDefault();
    });

    $('body').on('touchend', (e) => {
		if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
			if (startX > endX) {
				moveLeft();
			} else {
				moveRight();
			}
		} else {
			if (startY > endY) {
				moveUp();
			} else {
				moveDown();
			}
		}
    });
});