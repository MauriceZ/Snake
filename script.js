var snake = [[Math.floor(Math.random()*11),Math.floor(Math.random()*11)]];

var grid = function(){
	for (var i=0; i<1600; i++){
		$(function(){
			$('#grid').append('<div class="tile"></div>');
		});
	}
};

$(function(){
	grid();
});