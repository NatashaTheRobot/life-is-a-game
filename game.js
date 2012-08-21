$(function(){
	var COMPUTER = 0; //computer is Os
	var OPPONENT = 1; //opponent is Xs
	
	var board = {};
	var row1, row2, row3, column1, column2, column3, diagonal1, diagonal2;
	
	function numFromWord(word) {
		var regex = new RegExp(/\d/)
		return parseInt(regex.exec(word))
	}
	
	//adds a cell object to the board
	function addCellToBoard(cell) {
		var cellName = cell.attr('id');
		var id = numFromWord(cellName);
		var coordinates = cell.attr('coordinates').split('-');
		var x = numFromWord(coordinates[0]);
		var y = numFromWord(coordinates[1]);
		board.cellName = {id: id, x: x, y: y, content: OPPONENT};
	}
	
	//check rows for winner
	function winnerRow(){
		if(row1 === undefined) {
			if('cell1' in board && 'cell2' in board && 'cell3' in board){
				 if(board.cell1.content === board.cell2.content === board.cell3.content){
					alert('somebody won!!!!')
				} else {
					row1 = false
				}
			}
		}
		if(row2 === undefined) {
			if('cell4' in board && 'cell5' in board && 'cell6' in board){
				 if(board.cell4.content === board.cell5.content === board.cell6.content){
					alert('somebody won!!!!')
				} else {
					row2 = false
				}
			}
		}
		if(row3 === undefined) {
			if('cell7' in board && 'cell8' in board && 'cell9' in board){
				 if(board.cell7.content === board.cell8.content === board.cell9.content){
					alert('somebody won!!!!')
				} else {
					row3 = false
				}
			}
		}
	}
	
	function checkForWinner(){
		checkRows();
		//if there is no winner returns false
		//if there is a winner returns true
	}
	
	//plays the next move
	function play(cell) {
		$(cell).html("X");
		$(cell).off('click');
		addCellToBoard(cell);
		if(!checkForWinner()) {
			makeMove();
		} else {
			//add jquery to add text for winner
		}
	}

	//add click event handler for each cell
	$('.span1').click(function(){
		play($(this));
	});
});	