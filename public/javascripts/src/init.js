// var elArr = []; 
// /**
// 	Create draggable element using svg.
// 	Should be first function run before attaching iteract.js handlers
// **/
// var init = function(){
// 	SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {
// 	  return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
// 	};

// 	// var elArr = []; // store elements in this array.  put this here for now until we figure out object structure.

// 	// var dropHeight = $('.dropzone')[0].height();
// 	// var dropWidth = $('.dropzone')[0].width();
// 	var dropHeight = 120;
// 	var dropWidth = 120;
	
// 	dropzoneHighlight();  //box highlight
// 	createDragElement(dropHeight, dropWidth, elArr);  //setup dropzone click event handler
// }

// function dropzoneHighlight(){

// }


//grid and drop are the synonymous 
module.exports = {
	init: function(){
		setDropWidth(120);
		setDropHeight(120);
		addDropzoneHover();
	},
	getDropDimensions: function(){
		return dropDims; 
	},
	getElArr: function(){
		return elArr;
	},
	getGridCoordinates: function(){
		return gridInitCoord;
	}
}

var elArr = [];
var dropDims = {
	dropHeight: 0,
	dropWidth: 0
}

var gridInitCoord = {
	//grid init
	initXCoord: 0,
	initYCoord: 0,
	// set init grid size
	initRowSize: 0,
	initColSize: 11
}



function addElement(el){

}

function setDropWidth(x){
	dropDims.dropWidth = x;
}

function setDropHeight(x){
	dropDims.dropHeight = x;
}

function addDropzoneHover(){
	$('body') //this is how you do live updates of event listeners
	.on('mouseover','.dropzone',function(e){
		$(e.currentTarget).addClass('hoverover');
	})
	.on('mouseout', '.dropzone',function(e){
		$(e.currentTarget).removeClass('hoverover');
	});
}



// function getDropDimensions(){
// 	// this will calculate screen size and determine dropzone box width and height
// 	//set width and height 

// }





