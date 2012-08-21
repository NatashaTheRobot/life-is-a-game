$(function(){
	var COMPUTER = 0;
	var OPPONENT = 1;
	
	var plays = new Array(9)
	
	//returns the numeric index of the cell
	function findIndex(indexString) {
		var regex = new RegExp(/\d/)
		return regex.exec(indexString)[0]
	}
	
	function checkForWin() {
		
	}
	
	function counterMove() {
		//checks for 2 Self moves in a row for a winning move
		checkForWin();
		//checks for 2 Opponent moves in a row for a blocking move
		//checks for a path of most wins and adds self move
	}
	
	//plays the next move
	function play(cell) {
		$(cell).off('click');
		var cellIndex = findIndex($(cell).attr('name'));
		plays[cellIndex] = 'opponent';
		console.log(plays)
		counterMove();
	}

	//add event handlers for each cell
	$('.span1').click(function(){
		alert($(this).attr('id'));
		play($(this));
	});
});	