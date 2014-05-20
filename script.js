var snake = {
	position: [],
	direction: 0,
	count: 0
}

var apple = [];

function newApple(){
	apple[0] = Math.floor(Math.random()*31+1);
	apple[1] = Math.floor(Math.random()*31+1);
	$(function(){
		$('#'+apple[0]+'-'+apple[1]).css("background-color","red");
	});
};

function grid(){
	$(function(){
		var row = 1;
		var column = 1;
		for (var i=1; i<1281; i++){
			$("#grid").append('<div class="tile" id="' + column + '-' + row + '"></div>')

			if (column == 32){
				column = 1;
			}
			else{
				column += 1;
			}
			if (i % 32 == 0){
				row += 1;
			}
		}
	});
};

function growSnake(){

	var newSnakePart;

	if (snake.position.length == 1){
		switch(snake.direction){
			case 37:
				newSnakePart = [snake.position[0][0]+1,snake.position[0][1]];
				break;
			case 38:
				newSnakePart = [snake.position[0][0],snake.position[0][1]+1];
				break;
			case 39:
				newSnakePart = [snake.position[0][0]-1,snake.position[0][1]];
				break;
			case 40:
				newSnakePart = [snake.position[0][0],snake.position[0][1]-1];
				break;
		}
	}
	else{
		if(snake.position[snake.position.length-1][0] == snake.position[snake.position.length-2][0]){

			if (snake.position[snake.position.length-1][1]-snake.position[snake.position.length-2][1] == 1){
				newSnakePart = [snake.position[snake.position.length-1][0],snake.position[snake.position.length-1][1]+1];
			}
			else if (snake.position[snake.position.length-1][1]-snake.position[snake.position.length-2][1] == -1){
				newSnakePart = [snake.position[snake.position.length-1][0],snake.position[snake.position.length-1][1]-1];
			}
		}

		else if(snake.position[snake.position.length-1][1] == snake.position[snake.position.length-2][1]){

			if (snake.position[snake.position.length-1][0]-snake.position[snake.position.length-2][0] == 1){
				newSnakePart = [snake.position[snake.position.length-1][0]+1,snake.position[snake.position.length-1][1]];
			}
			else if (snake.position[snake.position.length-1][0]-snake.position[snake.position.length-2][0] == -1){
				newSnakePart = [snake.position[snake.position.length-1][0]-1,snake.position[snake.position.length-1][1]];
			}
		}
	}

	snake.position.push(newSnakePart);

	for (var i=0; i<snake.position.length; i++){
		$('#'+snake.position[i][0]+'-'+snake.position[i][1]).css("background-color","#000");
	}

};

function move(){

	// function to clone double arrays
	Array.prototype.clone = function() {
    var arr = this.slice(0);
    for( var i = 0; i < this.length; i++ ) {
        if( this[i].clone ) {
            arr[i] = this[i].clone();
        }
    }
    	return arr;
	}

	var temp = snake.position.clone()
	
	switch(snake.direction){
		case 37:
			snake.position[0][0]--;
			break;
		case 38:
			snake.position[0][1]--;
			break;
		case 39:
			snake.position[0][0]++;
			break;
		case 40:
			snake.position[0][1]++;
			break;
	};

	if (snake.position.length>1){
		for (var i=1; i<snake.position.length; i++){
			snake.position[i] = temp[i-1];
		}
	}

	for (var i=0; i<snake.position.length; i++){
		$('#'+snake.position[i][0]+'-'+snake.position[i][1]).css("background-color","#000");
	}

	if (snake.direction != 0){
		$('#'+temp[temp.length-1][0]+'-'+temp[temp.length-1][1]).css("background-color","rgb(249,246,216)");
	}
	
}

function is_dead(){
	for (var i=1;i<snake.position.length;i++){
		if (snake.position[0][0] == snake.position[i][0] && snake.position[0][1] == snake.position[i][1]){
			return true;
		}
	}

	if (snake.position[0][0] > 32 || snake.position[0][0] < 1 || snake.position[0][1] > 32 || snake.position[0][1] < 1){
		return true;
	}
}

function newGame(){
	$(function(){
		$('.tile').css('background-color', 'rgb(249,246,216)');
		snake.position = [[Math.floor(Math.random()*31+1),Math.floor(Math.random()*31+1)]];
		snake.direction = 0;
		newApple();
		$('#score').html(snake.count);
		$('#'+snake.position[0][0]+'-'+snake.position[0][1]).css("background-color","#000"); // initialize snake
		$('#'+apple[0]+'-'+apple[1]).css("background-color","red"); // and apple

		var interval = setInterval(function(){
			$(document).keydown(function(event){
				if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40){
					event.preventDefault();
					snake.direction = event.which;
				}
			});

			if(snake.position[0][0] == apple[0] && snake.position[0][1] == apple[1]){ // what to do when snakes eats an apple 
				snake.count++;
				newApple();
				growSnake();
				$('#score').html(snake.count);
			}

			move();

			if(is_dead()){
				if (snake.count > bestScore){
					bestScore = snake.count;
					$('#bestScore').html(bestScore);
				}
				snake.count = 0;
				clearInterval(interval);
				alert('Dead!');
				newGame();
			}

		}, speed);
	});
}

/* Main function starts here */

var speed = 50;
grid();
var bestScore = 0;
newGame();









