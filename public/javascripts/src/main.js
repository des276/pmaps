// replacement for ./public/javascripts/test.js
var test = require('./init.js');

$(function(){
	// test.getDropDimensions();
	test.init();
	console.log(test.getGridCoordinates());
	// console.log(test.getDropDimensions());
	// console.log(test.getElArr());
})
