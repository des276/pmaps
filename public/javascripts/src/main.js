// replacement for ./public/javascripts/test.js
var test = require('./init.js');
var dropzone = require('./dropzone.js');

$(function(){
	// test.getDropDimensions();
	test.init();
	// console.log(dropzone.getGridCoordinates().initRowSize);
	// dropzone.sizeObjCont(dropzone.getGridCoordinates().initColSize,dropzone.getGridCoordinates().initRowSize);//THIS SHIT AIN'T WERKIN'
	// dropzone.sizeObjCont(11,3);
	// console.log(dropzone.getGridCoordinates().initColSize);
	// console.log(dropzone.getGridCoordinates().initRowSize);
	// console.log(dropzone.sizeObjCont());
	dropzone.startGrid();
	dropzone.initDzArr();
	dropzone.addXDZ();
	dropzone.addYDZ();
	dropzone.deleteXDZ();
	dropzone.deleteYDZ();
	dropzone.deleteEls();
})