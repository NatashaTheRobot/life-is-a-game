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
	
	function checkCellMatch(row){
		var contents = [];
		for(cell in rows[row]) {
			contents.push(rows[row][cell].content);
		}
		return contents[0] === contents[1] && contents[1] === contents[2];
	}
	
	function checkRows() {
		for(row in rows) {
			if(!rows[row].hasOwnProperty('winner')){
				if(countCells(rows[row]) === 3){
					if(checkCellMatch(row)) {
						return true;
					} else {
						rows[row].winner = false;
					}
				}
			}
		}
		return false;
	}
	
	function checkForWinner(){
		return checkRows();
		//if there is no winner returns false
		//if there is a winner returns true
	}
	
	//plays the next move
	function play(cell) {
		$(cell).html("X");
		$(cell).off('click');
		addCellToBoards(cell);
		if(!checkForWinner()) {
			//makeMove(); - blocking or best possible spot
		} else {
			alert('someone has won!!!')
			//add jquery to add text for winner
		}
	}

	//add click event handler for each cell
	$('.span1').click(function(){
		play($(this));
	});
});	