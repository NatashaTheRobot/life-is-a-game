$(function(){
	var COMPUTER = 0;
	var OPPONENT = 1;
	
	var board = {}
	
	function numFromWord(word) {
		var regex = new RegExp(/\d/)
		return parseInt(regex.exec(word))
	}
	
	
	function findWinningCells(x, y) {
		var winner = {}
		var x1, x2, y1, y2;
		
		//winner row cell x's
		if(x === 0 ) {
			x1 = 1;
			x2 = 2;
		} else if(x === 1) {
			x1 = 0;
			x2 = 2;
		} else {
			x1 = 0;
			x2 = 1;
		};
		
		//winner column cell y's
		if(y === 0) {
			y1 = 1;
			y2 = 2;
		} else if(y === 1) {
			y1 = 0;
			y2 = 2;
		} else {
			y1 = 0;
			y2 = 1;
		};
		
		winner.row = {cell1: {x: x1, y: y}, cell2: {x: x2, y: y}};
		winner.column = {cell1: {x: x, y: y1}, cell2: {x: x, y: y2}};
		
		//add diagonal winners for relavent cells
		var centerCell = {x: 1, y: 1}
		if(x === 1 && y === 1) {
			winner.diagonal1 = {cell1: {x: 0, y: 2}, cell2: {x: 2, y: 0}};
			winner.diagonal2 = {cell1: {x: 2, y: 2}, cell2: {x: 0, y: 0}}; 
		}
		
	}
	
	function addCellToBoard(cell) {
		var cellName = cell.attr('id');
		var id = numFromWord(cellName);
		var coordinates = cell.attr('coordinates').split('-');
		var x = numFromWord(coordinates[0]);
		var y = numFromWord(coordinates[1]);
		var winningCells = findWinningCells(x, y)
		board.cellName = {id: id, x: x, y: y, content: OPPONENT};
	}
	//plays the next move
	function play(cell) {
		$(cell).off('click');
		addCellToBoard(cell);
	}

	//add event handlers for each cell
	$('.span1').click(function(){
		play($(this));
	});
});	