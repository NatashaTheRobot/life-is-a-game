$(function(){
	var COMPUTER = 'o'; //computer is Os
	var OPPONENT = 'x'; //opponent is Xs
	
	var cells = {}; // all cells
	var rows = {row0: {}, row1: {}, row2: {}}; // cells in rows
	var columns = {column0: {}, column1: {}, column2: {}}; //cells in columns
	var diagonals = {diagonal1: {}, diagonal2: {}}; //cells in diagonals
	
	function numFromWord(word) {
		var regex = new RegExp(/\d/)
		return parseInt(regex.exec(word))
	}
	
	//checks if the cell is in one of the diagonals
	function diagonalPossible(x, y) {
		if((x === 0 && y == 1) || (x === 1 && y === 2) || (x === 1 && y === 0) || (x === 2 && y === 1)){
			return false;
		} else {
			return true;
		}
	}
	
	//adds a cell object to the boards
	function addCellToBoards(cell) {
		var cellName = cell.attr('id');
		var id = numFromWord(cellName);
		var coordinates = cell.attr('coordinates').split('-');
		var x = numFromWord(coordinates[0]);
		var y = numFromWord(coordinates[1]);
		cells.cellName = {id: id, x: x, y: y, content: OPPONENT};
		var rowName = 'row' + y;
		rows[rowName][cellName] = cells.cellName;
		//rows[rowName].count === undefined ? rows[rowName].count = 1 : rows[rowName].count ++;
		var columnName = 'column' + x;
		columns[columnName][cellName] = cells.cellName;
		//columns[columnName].count === undefined ? columns[columnName].count = 1 : columns[columnName].count ++;
		if(diagonalPossible(x, y)) {
			if(x == 1 && y == 1){
				diagonals['diagonal1'][cellName] = cells.cellName;
				diagonals['diagonal2'][cellName] = cells.cellName;
			} else if ((x === 0 && y === 2) || (x === 2 && y === 0)) {
				diagonals['diagonal1'][cellName] = cells.cellName;
			} else {
				diagonals['diagonal2'][cellName] = cells.cellName;
			}
		}
	}
	
	function countCells(obj) {
		var count = 0;
		for(keys in obj) {
			count ++;
		}
		return count;
	}
	
	function checkCellMatch(element){
		var contents = [];
		var elements = element + 's'
		for(cell in elements[element]) {
			contents.push(elements[element][cell].content);
		}
		return contents[0] === contents[1] && contents[1] === contents[2];
	}
	
	//checks rows, columns, or diagonals for 3 in a row wins
	function checkBoards(elements) {
		for(element in elements) {
			if(!elements[element].hasOwnProperty('winner')){
				if(countCells(elements[element]) === 3){
					if(checkCellMatch(element)) {
						return true;
					} else {
						elements[element].winner = false;
					}
				}
			}
		}
		return false;
	}
	
	function checkForWinner(){
		return checkBoards(rows) || checkBoards(columns) || checkBoards(diagonals);
	}
	
	function makeMove() {
		//check for blocking
		//find best solution
	}
	
	//plays the next move
	function play(cell) {
		$(cell).html("X");
		$(cell).off('click');
		addCellToBoards(cell);
		if(!checkForWinner()) {
			makeMove();
		} else {
			var winText = "<div class='alert alert-success'>we have a winner!!!!!</div>"
			$(winText).prependTo('.board')
			$('.span1').off('click');
		}
	}

	//add click event handler for each cell
	$('.span1').click(function(){
		play($(this));
	});
});	