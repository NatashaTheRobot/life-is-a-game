$(function(){

	//add event handlers for each cell
	$('#cell02').on('click', function(){
		alert('0,2');
		$('#cell02').off('click');
	});
	$('#cell12').on('click', function(){
		alert('1,2');
		$('#cell12').off('click');
	});
	$('#cell22').on('click', function(){
		alert('2,2');
		$('#cell22').off('click');
	});
	$('#cell01').on('click', function(){
		alert('0,1');
		$('#cell01').off('click');
	});
	$('#cell11').on('click', function(){
		alert('1,1');
		$('#cell11').off('click');
	});
	$('#cell21').on('click', function(){
		alert('2,1');
		$('#cell21').off('click');
	});
	$('#cell00').on('click', function(){
		alert('0,0');
		$('#cell00').off('click');
	});
	$('#cell10').on('click', function(){
		alert('1,0');
		$('#cell10').off('click');
	});
	$('#cell20').on('click', function(){
		alert('2,0');
		$('#cell20').off('click');
	});
	

});	