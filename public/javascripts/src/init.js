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

module.exports = {
	init: function(){
		console.log('hi');
		// getDropDimensions();

	},
	getDropHeight: function(){
		// return 
	}
}

var dropHeight = 120;
var dropWidth = 120;

function setDropWidth(x){
	this.dropWidth = x;
}

function setDropHeight(x){
	this.dropHeight = x;
}

function getDropDimensions(){
	// this will calculate screen size and determine dropzone box width and height
	//set width and height 

}





