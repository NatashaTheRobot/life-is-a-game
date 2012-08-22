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
		for(key in obj) {
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
			if(countCells(elements[element]) === 3){
				if(checkCellMatch(elements[element])) {
					return true;
				} else {
					return false;
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
		for(cell in element) {
			contents.push(element[cell].content);
		}
		return contents[0] === contents[1] && contents[1] === OPPONENT;
	}
	
	//checks rows, columns, or diagonals for 3 in a row wins
	function checkBoardsToBlock(elements) {
		for(element in elements) {
			if(countCells(elements[element]) === 2){
				if(checkBlockMatch(elements[element])) {
					return elements[element];
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
	
	function addLastSectionCell(cells) {
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
			$(coordinates).html(COMPUTER);
			$(coordinates).off('click');
			addCellToBoardsFromCoordinates(x,y);
		}
		
	}
	
	
	//adding the block move to the board
	function makeBlockMove(blockSection) {
		var cells = []
		for(var cell in blockSection) {
			//if(blockSection[cell].content === OPPONENT){
				cells.push(blockSection[cell]);
			//}	
		}
		//if(cells.length === 2){
			addLastSectionCell(cells);
		//}	
	}
	
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
			if(countCells(elements[element]) == 2){
				if(checkForWin(elements[element])) {
					return elements[element];
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
			addLastSectionCell(cells)
			return true;
		} else {
			return false;
		}
	}
	
	//checks if the given row, column, or diagonal are empty
	function isEmpty(element) {
		return jQuery.isEmptyObject(element)
	}
	
	function cellFilled(x,y) {
		var row = 'row' + y
		for(cell in rows[row]){
			var cellObj = rows[row][cell]  
			if(cellObj.x === x && cellObj.y === y){
				return true;
			}
		}
		return false;
	}
	
	//checks a row, column, or diagonal to see if existing cells are Os
	function hasOnlyComputerCells(element){
		for(cell in element){
			if(element[cell].content === OPPONENT){
				return false;
			}
		}
		return true;
	}
	
	function checkForThreeWin(x,y,d) {
		//check if there is a value already there
		if(cellFilled(x,y)){
			return false;
		}
		//check row, columns, diagonals for empty or computer cells
		var row = rows['row' + y]
		var column = columns['column' + x]
		var diagonal = diagonals['diagonal' + d]
		var sectionsEmpty = isEmpty(row) && isEmpty(column) && isEmpty(diagonal);
		var sectionsHaveOnlyComputerCells = hasOnlyComputerCells(column) && 
																				hasOnlyComputerCells(row) && 
																				hasOnlyComputerCells(diagonal);																	
		if(sectionsHaveOnlyComputerCells || sectionsEmpty){
			return {x: x, y: y}
		} else {
			return false;
		}
	}
	
	//finds the coordinates of the first cell with 3 possibilities of winning
	function threeWinCell(){
		return checkForMiddleWinThree() ||
					 checkForThreeWin(0,2,1) || 
					 checkForThreeWin(0,0,2) || 
					 checkForThreeWin(2,2,2) || 
					 checkForThreeWin(2,0,1);
	}
	
	function checkForTwoWin(x,y,d){
		//check if there is a value already there
		if(cellFilled(x,y)){
			return false;
		}
		//check row, columns, diagonals for empty or computer cells
		var row = rows['row' + y]
		var column = columns['column' + x]
		var sectionsEmpty;
		var sectionsHaveOnlyComputerCells;
		if(d !== 0){
			var diagonal = diagonals['diagonal' + d]
			sectionsEmpty = (isEmpty(row) && isEmpty(column)) ||
											(isEmpty(row) && isEmpty(diagonal)) ||
											(isEmpty(column) && isEmpty(diagonal));
			sectionsHaveOnlyComputerCells = (hasOnlyComputerCells(row) && hasOnlyComputerCells(column)) ||
											                (hasOnlyComputerCells(row) && hasOnlyComputerCells(diagonal)) ||
																			(hasOnlyComputerCells(column) && hasOnlyComputerCells(diagonal));
		} else {
			sectionsEmpty = isEmpty(row) && isEmpty(column);
			sectionsHaveOnlyComputerCells = hasOnlyComputerCells(row) && hasOnlyComputerCells(column);
		}	
																	
		if(sectionsHaveOnlyComputerCells || sectionsEmpty){
			return {x: x, y: y}
		} else {
			return false;
		}
		
	}
	
	//finds the first cell with two win paths
	function twoWinCell(){
		return checkForMiddleTwoWin()
					 checkForTwoWin(0,2,1) || 
					 checkForTwoWin(0,0,2) || 
					 checkForTwoWin(2,2,2) || 
					 checkForTwoWin(2,0,1) ||
					 checkForTwoWin(1,2,0) ||
					 checkForTwoWin(0,1,0) ||
					 checkForTwoWin(2,1,0) ||
					 checkForTwoWin(1,0,0);
	}
	
	function checkForOneWin(x,y,d){
		//check if there is a value already there
		if(cellFilled(x,y)){
			return false;
		}
		//check row, columns, diagonals for empty or computer cells
		var row = rows['row' + y]
		var column = columns['column' + x]
		var sectionsEmpty;
		var sectionsHaveOnlyComputerCells;
		if(d !== 0){
			var diagonal = diagonals['diagonal' + d];
			sectionsEmpty = isEmpty(row) || 
											isEmpty(column) || 
											isEmpty(diagonal);
			sectionsHaveOnlyComputerCells = hasOnlyComputerCells(row) || 
																			hasOnlyComputerCells(column) ||
											                hasOnlyComputerCells(diagonal);
		} else {
			sectionsEmpty = isEmpty(row) || isEmpty(column);
			sectionsHaveOnlyComputerCells = hasOnlyComputerCells(row) || hasOnlyComputerCells(column);
		}																
		if(sectionsHaveOnlyComputerCells || sectionsEmpty){
			return {x: x, y: y}
		} else {
			return false;
		}
		
	}
	
	function checkForMiddleWinThree(){
		if(cellFilled(1,1)){
			return false;
		}
		var row = rows['row1'];
		var column = columns['column1'];
		var diagonal1 = diagonals['diagonal1'];
		var diagonal2 = diagonals['diagonal2'];
		var sectionsEmpty = (isEmpty(row) && isEmpty(column) && isEmpty(diagonal1)) ||
												(isEmpty(row) && isEmpty(column) && isEmpty(diagonal2))	||
												(isEmpty(row) && isEmpty(diagonal1) && isEmpty(diagonal2)) ||
												(isEmpty(column) && isEmpty(diagonal1) && isEmpty(diagonal2));
		var sectionsHaveOnlyComputerCells = (hasOnlyComputerCells(column) && 
																				hasOnlyComputerCells(row) && 
																				hasOnlyComputerCells(diagonal1)) ||
																				(hasOnlyComputerCells(column) && 
																				hasOnlyComputerCells(row) && 
																				hasOnlyComputerCells(diagonal2)) ||
																				(hasOnlyComputerCells(row) && 
																				hasOnlyComputerCells(diagonal1) && 
																				hasOnlyComputerCells(diagonal2)) ||
																				(hasOnlyComputerCells(column) && 
																				hasOnlyComputerCells(diagonal1) && 
																				hasOnlyComputerCells(diagonal2));																	
		if(sectionsHaveOnlyComputerCells || sectionsEmpty){
			return {x: 1, y: 1}
		} else {
			return false;
		}
		
	}
	
	function checkForMiddleTwoWin(){
		if(cellFilled(1,1)){
			return false;
		}
		var row = rows['row1'];
		var column = columns['column1'];
		var diagonal1 = diagonals['diagonal1'];
		var diagonal2 = diagonals['diagonal2'];
		
		var sectionsEmpty = (isEmpty(row) && isEmpty(column)) ||
										(isEmpty(row) && isEmpty(diagonal1)) ||
										(isEmpty(column) && isEmpty(diagonal1)) ||
										(isEmpty(row) && isEmpty(diagonal2)) ||
										(isEmpty(column) && isEmpty(diagonal2));
		var sectionsHaveOnlyComputerCells = (hasOnlyComputerCells(row) && hasOnlyComputerCells(column)) ||
										                (hasOnlyComputerCells(row) && hasOnlyComputerCells(diagonal1)) ||
																		(hasOnlyComputerCells(column) && hasOnlyComputerCells(diagonal1)) ||
																		(hasOnlyComputerCells(row) && hasOnlyComputerCells(diagonal1)) ||
																		(hasOnlyComputerCells(column) && hasOnlyComputerCells(diagonal1));																
		if(sectionsHaveOnlyComputerCells || sectionsEmpty){
			return {x: 1, y: 1}
		} else {
			return false;
		}
		
	}
	
	function checkForMiddleOneWin(){
		if(cellFilled(1,1)){
			return false;
		}
		var row = rows['row1'];
		var column = columns['column1'];
		var diagonal1 = diagonals['diagonal1'];
		var diagonal2 = diagonals['diagonal2'];
		
		var sectionsEmpty = isEmpty(row) || isEmpty(column) ||
										    isEmpty(diagonal1) || isEmpty(diagonal2);
		var sectionsHaveOnlyComputerCells = 	hasOnlyComputerCells(row) || 
																					hasOnlyComputerCells(diagonal1) ||
																					hasOnlyComputerCells(column) ||
																					hasOnlyComputerCells(diagonal2);																
		if(sectionsHaveOnlyComputerCells || sectionsEmpty){
			return {x: 1, y: 1}
		} else {
			return false;
		}
		
	}
	
	//finds the first cell with one win path
	function oneWinCell(){
		return   checkForMiddleOneWin()||
						 checkForOneWin(0,2,1) || 
						 checkForOneWin(0,0,2) || 
						 checkForOneWin(2,2,2) || 
						 checkForOneWin(2,0,1) ||
						 checkForOneWin(1,2,0) ||
						 checkForOneWin(0,1,0) ||
						 checkForOneWin(2,1,0) ||
						 checkForOneWin(1,0,0);
	}
	
	function addCellToDom(cell){
		var coordinateId = '#x' + cell.x + '-y' + cell.y;
		$(coordinateId).html(COMPUTER);
		$(coordinateId).off('click');
		addCellToBoardsFromCoordinates(cell.x, cell.y);
	}
	
	//the best move is one that maximizes the chance of winning
	function makeBestMove() {
		var cell;									
		if(cell = threeWinCell()){
			addCellToDom(cell);
		} else if(cell = twoWinCell()){
			addCellToDom(cell);
		} else if(cell = oneWinCell()){
			addCellToDom(cell);
		}
		
	}
	
	function makeMove() {
		if(!makeWinningMove()){
			var toBlock = checkBoardsToBlock(rows) || checkBoardsToBlock(columns) || checkBoardsToBlock(diagonals);
			if(toBlock){
				makeBlockMove(toBlock);
			}	else {
				makeBestMove();
			}
		}	
		if(isWinner()) {
			var winText = "<div class='alert alert-success'>Computer wins!!!!!</div>"
			$(winText).prependTo('.board')
			$('.span1').off('click');
		}
	}
	
	//plays the next move
	function play(cell) {
		$(cell).html(OPPONENT);
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