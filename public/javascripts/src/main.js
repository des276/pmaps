var initial = require('./init.js');
var dropzone = require('./dropzone.js')
var element = require('./element.js');

$(function(){
	initial.init();
	var dropzoneDims = initial.getDropDimensions();
	dropzone.startGrid();
	dropzone.initDzArr();
	dropzone.addXDZ();
	dropzone.addYDZ();
	dropzone.deleteXDZ();
	dropzone.deleteYDZ();
	dropzone.deleteEls();

	element.init(dropzoneDims.dropHeight, dropzoneDims.dropWidth, initial.getElArr());

})