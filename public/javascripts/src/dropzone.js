var test2 = require('./init.js');

//Grid expansion function
function gridExpand(xCoord,yCoord){
	$("#object_container").append('<div class="dropzone first" data-xCoordDZ=' + xCoord + ' data-yCoordDZ='+ yCoord +'>');
	$('.dropzone[data-xCoordDZ=' + xCoord + '][data-yCoordDZ='+ yCoord +']').css({left: $('.dropzone.first').width() * xCoord, top: $('.dropzone.first').height() * yCoord, position:'absolute'});
}

//Grid contraction function
function gridContract(xCoord,yCoord){
	$('.dropzone[data-xCoordDZ=' + xCoord + '][data-yCoordDZ='+ yCoord +']').remove();
}

//Container sizing function
function sizeObjCont(xCoord,yCoord){
	var contWidthPx = $('.dropzone.first').width() * (xCoord+1);
	var contHeightPx = $('.dropzone.first').height() * (yCoord+1);
	$("#object_container").css({width: contWidthPx, height: contHeightPx});
	$("#object_container_overlay").css({width: contWidthPx, height: contHeightPx});//Temp; need to get rid of the overlay, but some dependency is causing issues.
}

//Grid initialization	
var initXCoord = 0;
var initYCoord = 0;

//Set initial grid size
var initRowSize = 3;
var initColSize = 11;

var xDZCoord = initColSize; //Keeps track of dropzone grid size in the x direction.
var yDZCoord = initRowSize; //Keeps track of dropzone grid size in the y direction.

//Dropzone positioning array
var dzPosArr = new Array(initColSize+1);

var elDZtraverseCount = 0; //Var to count the number of DZs traversed during ondragleave for purposes of getting the first one

var gridInitCoord = {
	//grid init
	initXCoord: 0,
	initYCoord: 0,
	// set init grid size
	initRowSize: 3,
	initColSize: 11
}


// sizeObjCont(initColSize,initRowSize);

module.exports = {
	//First for loop expands rows
	startGrid: function(){
	for(initYCoord=0; initYCoord <= initRowSize; initYCoord++) {
		gridExpand(0,initYCoord);
			//Second for loop expands columns
			for(initXCoord=1; initXCoord <= initColSize; initXCoord++) {
				gridExpand(initXCoord,initYCoord);
			};
		}
		sizeObjCont(initColSize,initRowSize);
	},
	//Initialize 2D array
	initDzArr: function(){
		for (i=0; i < (initColSize+1); i++) {
		dzPosArr[i]=new Array(initRowSize+1);
		};
	},
	addXDZ: function(){
		//Button function for adding dropzone columns (later this will be triggered by elements nearing the edge, as well as button)
		$('.button_horizontal').click(function () {
			  	xDZCoord++
			  	//For everything after new rows have been added
			  	if (yDZCoord != 0) {
					var tempCount = 0;
					for(tempCount=0; tempCount <= yDZCoord; tempCount++) {
						gridExpand(xDZCoord,tempCount);
					};
				} else {
					//For before new rows have been added
					gridExpand(xDZCoord,yDZCoord);
				}
				//Increase array in the x direction with same size rows in the new x slot
				dzPosArr.length = xDZCoord+1;
				for (i=xDZCoord; i < (xDZCoord+1); i++) {
					dzPosArr[i]=new Array(yDZCoord+1);
				};

				sizeObjCont(xDZCoord,yDZCoord);
		});
	},
	addYDZ: function(){
		//Button function for adding dropzone rows (later this will be triggered by elements nearing the edge, as well as button)
		$('.button_vertical').click(function () {
				yDZCoord++
				//For everything after new columns have been added
			  	if (xDZCoord != 0) {
					var tempCount = 0;
					for(tempCount=0; tempCount <= xDZCoord; tempCount++) {
						gridExpand(tempCount,yDZCoord);
					};
				} else {
					//For before new columns have been added
					gridExpand(xDZCoord,yDZCoord);
				}
				//Increase array in the y direction
				for (i=0; i < (xDZCoord+1); i++) {
					dzPosArr[i].length++;
				};

				sizeObjCont(xDZCoord,yDZCoord);
		});
	},
	deleteXDZ: function(){
		//Button function for deleting dropzone columns (later this will be triggered by elements leaving the edge, as well as button)
		$('.button_delete_horizontal').click(function () {
				if(xDZCoord > 0) {
						for(tempCount=0; tempCount <= yDZCoord; tempCount++) {
							gridContract(xDZCoord,tempCount);
					}
					xDZCoord--
					//Decrease array in the x direction
					dzPosArr.length = xDZCoord+1;
				}

				sizeObjCont(xDZCoord,yDZCoord);
		});
	},
	deleteYDZ: function(){
		//Button function for deleting dropzone rows (later this will be triggered by elements leaving the edge, as well as button)
		$('.button_delete_vertical').click(function () {
				if(yDZCoord > 0) {
						for(tempCount=0; tempCount <= xDZCoord; tempCount++) {
							gridContract(tempCount,yDZCoord);
					}
				//Decrease array in the y direction
				for (i=0; i < (xDZCoord+1); i++) {
					dzPosArr[i].length--;
				};
					yDZCoord--
				}

				sizeObjCont(xDZCoord,yDZCoord);
		});
	},
	deleteEls: function(){
		$('.delete_elements').click(function(){
			var numElements = $('.selected').length;

			for(var i=0; i<numElements; i++){
				elArr.pop();
			}

			$('.selected').remove();
		});
	},
	//get the inital coords so we can size the obj container first.
	getGridCoordinates: function(){
		return gridInitCoord;
	},
	DZHighlight: function(event){
		$(event.target).addClass('hoverover');
	},
	stopDZHighlight: function(event){
		$(event.target).removeClass('hoverover');
	},
	onDropUpdatePos: function(event){
		var dropDZxCoord = $(event.target).attr("data-xCoordDZ");
		var dropDZyCoord = $(event.target).attr("data-yCoordDZ");
		dzPosArr[dropDZxCoord][dropDZyCoord] = 1; //Sets related position in array to 1, showing it is occupied

		//Gives the el attributes reflecting its current x/y position
		$(event.draggable).attr("data-xCoordEl",dropDZxCoord);
		$(event.draggable).attr("data-yCoordEl",dropDZyCoord);

		elDZtraverseCount = 0;//Resets traversal count to 0 as current traversal has ended
	},
	onLeaveUpdatePos: function(event){
		elDZtraverseCount++//Counts the number of DZs traversed during ondragleave for purposes of getting the first one
		//After only the first traversal, gets the dropzone coords
		if(elDZtraverseCount==1){
			var leaveDZxCoord = $(event.target).attr("data-xCoordDZ");
			var leaveDZyCoord = $(event.target).attr("data-yCoordDZ");
			dzPosArr[leaveDZxCoord][leaveDZyCoord] = 0;//Sets new value to array which el left to zero
		}
	}
}

//TODO:  Store elements deleted so user can undo
//TODO:  When we delete elements we need to modify array of elements for interactjs
