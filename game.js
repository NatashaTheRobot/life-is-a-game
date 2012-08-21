$(function(){
	
	var plays = new Array(9)
	
	//returns the index of the cell
	function findIndex(indexName) {
		var regex = new RegExp(/\d/)
		return regex.exec(indexName)[0]
	}
	
	function play(cellid) {
		$(cellid).off('click');
		var cellIndex = findIndex($(cellid).attr('name'));
		plays[cellIndex] = 'x';
		console.log(plays);
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