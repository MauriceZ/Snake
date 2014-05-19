var rand1 = Math.floor(Math.random()*39+1);
var rand2 = Math.floor(Math.random()*39+1);

var snake = {
	position: [[rand1,rand2]],
	direction: 39,
	count: 0
}

var apple = [Math.floor(Math.random()*39+1),Math.floor(Math.random()*39+1)];

function randApple(){
	apple[0] = Math.floor(Math.random()*39+1);
	apple[1] = Math.floor(Math.random()*39+1);
	$(function(){
		$('#'+apple[0]+'-'+apple[1]).css("background-color","red");
	});
};

function grid(){
	$(function(){
		var row = 1;
		var column = 1;
		for (var i=1; i<1601; i++){
			$("#grid").append('<div class="tile" id="' + column + '-' + row + '"></div>')

			if (column == 40){
				column = 1;
			}
			else{
				column += 1;
			}
			if (i % 40 == 0){
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

function move(d){

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

	console.log("temp:" + temp + "pos:" + snake.position);
	
	switch(d){
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

	console.log("newtemp:" + temp + "newpos:" + snake.position);

	if (snake.position.length>1){
		for (var i=1; i<snake.position.length; i++){
			snake.position[i] = temp[i-1];
		}
	}
	for (var i=0; i<snake.position.length; i++){
		$('#'+snake.position[i][0]+'-'+snake.position[i][1]).css("background-color","#000");
	}

	$('#'+temp[0][0]+'-'+temp[0][1]).css("background-color","#FFF");
	

}


/* Main function starts here */

var speed = 200;

grid();

$(function(){
	for (var i=0; i<snake.position.length; i++){
		$('#'+snake.position[i][0]+'-'+snake.position[i][1]).css("background-color","#000");
	}
	$('#'+apple[0]+'-'+apple[1]).css("background-color","red");
});

$(function(){
	$(document).one("keydown",function(event){ // game starts when any key is pressed
		snake.direction = event.which;
		setInterval(function(){
			$(document).keydown(function(event){
				snake.direction = event.which;
			});
			
			if(snake.position[0][0] == apple[0] && snake.position[0][1] == apple[1]){
				snake.count++;
				randApple();
				//growSnake();

			}

			move(snake.direction);

			/*switch(snake.direction){
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
			};*/

			
		}, speed);
	});
});















