$(function(){
	
	var plays = new Array(9)
	
	//returns the numeric index of the cell
	function findIndex(indexString) {
		var regex = new RegExp(/\d/)
		return regex.exec(indexString)[0]
	}
	
	function counterMove() {
		//checks for 2 Self moves in a row for a winning move
		//checks for 2 Opponent moves in a row for a blocking move
		//checks for a path of most wins and adds self move
	}
	
	//plays the next move
	function play(cellid) {
		$(cellid).off('click');
		var cellIndex = findIndex($(cellid).attr('name'));
		plays[cellIndex] = 'opponent';
		console.log(plays)
		counterMove();
	}

	//add event handlers for each cell
	$('#cell02').on('click', function(){
		play('#cell02')
	});
	$('#cell12').on('click', function(){
		play('#cell12')
	});
	$('#cell22').on('click', function(){
		play('#cell22')
	});
	$('#cell01').on('click', function(){
		play('#cell01')
	});
	$('#cell11').on('click', function(){
		play('#cell11')
	});
	$('#cell21').on('click', function(){
		play('#cell21')
	});
	$('#cell00').on('click', function(){
		play('#cell00');
	});
	$('#cell10').on('click', function(){
		play('#cell10');
	});
	$('#cell20').on('click', function(){
		play('#cell20');
	});
	

});	