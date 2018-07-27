// replacement for ./public/javascripts/test.js
var test = require('./init.js');
var dropzone = require('./dropzone.js')

$(function(){
	// test.getDropDimensions();
	test.init();
	// console.log(dropzone.getGridCoordinates().initRowSize);
	dropzone.sizeObjCont(dropzone.getGridCoordinates().initColSize,dropzone.getGridCoordinates().initRowSize);//THIS SHIT AIN'T WERKIN'
	dropzone.startGrid();
	dropzone.initDzArr();
	dropzone.addXDZ();
	dropzone.addYDZ();
	dropzone.deleteXDZ();
	dropzone.deleteYDZ();
	dropzone.deleteEls();
})