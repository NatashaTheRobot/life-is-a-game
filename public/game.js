$(function(){
	var COMPUTER = 'o'; //computer is Os
	var OPPONENT = 'x'; //opponent is Xs
	
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
		var coordinates = cell.attr('id').split('-');
		var x = numFromWord(coordinates[0]);
		var y = numFromWord(coordinates[1]);
		var cellObj = {x: x, y: y, content: OPPONENT};
		var rowName = 'row' + y;
		rows[rowName]['cell' + x] = cellObj;
		var columnName = 'column' + x;
		columns[columnName]['cell' + y] = cellObj;
		if(diagonalPossible(x, y)) {
			if(x == 1 && y == 1){
				diagonals['diagonal1']['cell' + x] = cellObj;
				diagonals['diagonal2']['cell' + y] = cellObj;
			} else if ((x === 0 && y === 2) || (x === 2 && y === 0)) {
				diagonals['diagonal1']['cell' + x + y] = cellObj;
			} else {
				diagonals['diagonal2']['cell' + x + y] = cellObj;
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
		for(cell in element) {
			contents.push(element[cell].content);
		}
		return (contents[0] === contents[1]) && (contents[1] === contents[2]);
	}
	
	//checks rows, columns, or diagonals for 3 in a row wins
	function checkBoardsForWinner(elements) {
		for(element in elements) {
			if(!elements[element].hasOwnProperty('winner')){
				if(countCells(elements[element]) === 3){
					if(checkCellMatch(elements[element])) {
						return true;
					} else {
						elements[element].winner = false;
					}
				}
			}
		}
		return false;
	}
	
	function isWinner(){
		return checkBoardsForWinner(rows) || checkBoardsForWinner(columns) || checkBoardsForWinner(diagonals);
	}
	
	function checkBlockMatch(element) {
		var contents = [];
		var elements = element + 's'
		for(cell in elements[element]) {
			contents.push(elements[element][cell].content);
		}
		return contents[0] === contents[1];
	}
	
	//checks rows, columns, or diagonals for 3 in a row wins
	function checkBoardsToBlock(elements) {
		for(element in elements) {
			if(!elements[element].hasOwnProperty('winner') && !elements[element].hasOwnProperty('block')){
				if(countCells(elements[element]) === 2){
					if(checkBlockMatch(element)) {
						return elements[element];
					} else {
						elements[element].block = false;
					}
				}
			}
		}
		return false;
	}
	
	function addCellToBoardsFromCoordinates(x,y) {
		var cellObj = {x: x, y: y, content: COMPUTER};
		var rowName = 'row' + y;
		rows[rowName]['cell' + x] = cellObj;
		var columnName = 'column' + x;
		columns[columnName]['cell' + y] = cellObj;
		if(diagonalPossible(x, y)) {
			if(x == 1 && y == 1){
				diagonals['diagonal1']['cell1'] = cellObj;
				diagonals['diagonal2']['cell1'] = cellObj;
			} else if ((x === 0 && y === 2) || (x === 2 && y === 0)) {
				diagonals['diagonal1']['cell' + x + y] = cellObj;
			} else {
				diagonals['diagonal2']['cell' + x + y] = cellObj;
			}
		}
	}
	
	
	//adding the block move to the board
	function makeBlockMove(blockSection) {
		var cells = []
		for(var cell in blockSection) {
			cells.push(blockSection[cell]);
		}
		//same column
		if(cells[0].x === cells[1].x){
			var y;
			var sumYs = cells[0].y + cells[1].y
			if(sumYs === 3) {
				y = 0;
			} else if(sumYs === 2) {
				y = 1;
			} else {
				y = 2;
			}
			var coordinates = '#x' + cells[0].x + '-y' + y;
			$(coordinates).html('o');
			$(coordinates).off('click');
			addCellToBoardsFromCoordinates(cells[0].x,y);

		} else if(cells[0].y === cells[1].y) { //same row
			var x;
			var sumXs = cells[0].x + cells[1].x
			if(sumXs === 3) {
				x = 0;
			} else if(sumXs === 2) {
				x = 1;
			} else {
				x = 2;
			}
			var coordinates = '#x' + x + '-y' + cells[0].y;
			$(coordinates).html('o');
			$(coordinates).off('click');
			addCellToBoardsFromCoordinates(x,cells[0].y);

		} else { //same diagonal
			var x, y; 
			if((cells[0].x === 0 && cells[0].y === 0) || 
				 (cells[1].x === 2 && cells[1].y === 2) ||
				 (cells[1].x === 0 && cells[1].y === 0) ||
				 (cells[0].x === 2 && cells[0].y === 2)
				) {
				var sum = cells[0].x + cells[0].y + cells[1].x + cells[1].y;
				if(sum === 6) {
					x = 0;
					y = 0;
				} else if(sum === 4) {
					x = 1;
					y = 1;
				} else {
					x = 2;
					y = 2;
				}
			} else {
				var sumXs = cells[0].x + cells[1].x;
				var sumYs = cells[0].y + cells[1].y;
				if(sumXs === 3 && sumYs === 1) {
					x = 0;
					y = 2;
				} else if(sumXs === 1 && sumYs === 3) {
					x = 2;
					y = 0;
				} else {
					x = 1;
					y = 1;
				}
			}
			var coordinates = '#x' + x + '-y' + y;
			$(coordinates).html('o');
			$(coordinates).off('click');
			addCellToBoardsFromCoordinates(x,y);
		}
	}
	
	//future feture: if computer goes first
	// function isFirstMove() {
	// 	return jQuery.isEmptyObject(rows.row0) && jQuery.isEmptyObject(rows.row1) && jQuery.isEmptyObject(rows.row2);
	// }
	
	function checkForWin(element) {
		var contents = [];
		for(cell in element) {
			contents.push(element[cell].content);
		}
		return (contents[0] === contents[1]) && (contents[1] === COMPUTER);
	}
	
	//checks rows, columns, or diagonals for 3 in a row wins
	function checkBoardsForWin(elements) {
		for(element in elements) {
			if(!elements[element].hasOwnProperty('winner')){
				if(countCells(elements[element]) === 2){
					if(checkForWin(elements[element])) {
						return elements[element];
					} 
				}
			}
		}
		return false;
	}
	
	
	//if there are two O's in a row, computer adds the third one
	function makeWinningMove(){
		var winSection = checkBoardsForWin(rows) || checkBoardsForWin(columns) || checkBoardsForWin(diagonals);
		if(winSection){
			var cells = []
			for(var cell in winSection) {
				cells.push(winSection[cell]);
			}
			//same column
			if(cells[0].x === cells[1].x){
				var y;
				var sumYs = cells[0].y + cells[1].y
				if(sumYs === 3) {
					y = 0;
				} else if(sumYs === 2) {
					y = 1;
				} else {
					y = 2;
				}
				var coordinates = '#x' + cells[0].x + '-y' + y;
				$(coordinates).html('o');
				$(coordinates).off('click');
				addCellToBoardsFromCoordinates(cells[0].x,y);

			} else if(cells[0].y === cells[1].y) { //same row
				var x;
				var sumXs = cells[0].x + cells[1].x
				if(sumXs === 3) {
					x = 0;
				} else if(sumXs === 2) {
					x = 1;
				} else {
					x = 2;
				}
				var coordinates = '#x' + x + '-y' + cells[0].y;
				$(coordinates).html('o');
				$(coordinates).off('click');
				addCellToBoardsFromCoordinates(x,cells[0].y);

			} else { //same diagonal
				var x, y; 
				if((cells[0].x === 0 && cells[0].y === 0) || 
					 (cells[1].x === 2 && cells[1].y === 2) ||
					 (cells[1].x === 0 && cells[1].y === 0) ||
					 (cells[0].x === 2 && cells[0].y === 2)
					) {
					var sum = cells[0].x + cells[0].y + cells[1].x + cells[1].y;
					if(sum === 6) {
						x = 0;
						y = 0;
					} else if(sum === 4) {
						x = 1;
						y = 1;
					} else {
						x = 2;
						y = 2;
					}
				} else {
					var sumXs = cells[0].x + cells[1].x;
					var sumYs = cells[0].y + cells[1].y;
					if(sumXs === 3 && sumYs === 1) {
						x = 0;
						y = 2;
					} else if(sumXs === 1 && sumYs === 3) {
						x = 2;
						y = 0;
					} else {
						x = 1;
						y = 1;
					}
				}
				var coordinates = '#x' + x + '-y' + y;
				$(coordinates).html('o');
				$(coordinates).off('click');
				addCellToBoardsFromCoordinates(x,y);
			}
		} else {
			return false;
		}
	}
	
	//the best corner is one with 3 options of winning (row, column, diagonal)
	function findBestCorner() {
		
	}
	
	//the best move is one that maximizes the chance of winning
	function makeBestMove() {
			if(!makeWinningMove()){
				findBestCorner();
			}
	}
	
	function makeMove() {
		var toBlock = checkBoardsToBlock(rows) || checkBoardsToBlock(columns) || checkBoardsToBlock(diagonals);
		if(toBlock){
			makeBlockMove(toBlock);
		} else {
			makeBestMove();
		}
		if(isWinner()) {
			var winText = "<div class='alert alert-success'>Computer wins!!!!!</div>"
			$(winText).prependTo('.board')
			$('.span1').off('click');
		};
	}
	
	//plays the next move
	function play(cell) {
		$(cell).html("X");
		$(cell).off('click');
		addCellToBoards(cell);
		if(!isWinner()) {
			makeMove();
		} else {
			var winText = "<div class='alert alert-success'>You beat the computer!!!!!</div>"
			$(winText).prependTo('.board')
			$('.span1').off('click');
		}
	}

	//add click event handler for each cell
	$('.span1').click(function(){
		play($(this));
	});
});	