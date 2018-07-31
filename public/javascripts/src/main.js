var initial = require('./init.js');
var dropzone = require('./dropzone.js')
var elemento = require('./element.js');

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


	elemento.init(dropzoneDims.dropHeight, dropzoneDims.dropWidth, initial.getElArr());

	interact('.draggable')
		.draggable({
			snap: {
				relativePoints: [{x: 0.5, y:0.5}],
				endOnly: true
			},
			restrict: {
		  		restriction: 'parent',
	  			elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
		  		endOnly: true
			},
			inertia: false
		})
		.on('dragmove', function (event) {
			elemento.dragMove(event);
		})
		.on('mousedown mouseup', function(e){
			elemento.toggleSelection(e);
		})
		.on('dragend', function(event){
		    elemento.updateDragEndStates(event);
		})
		.on('mouseover', function(e){
			elemento.elMouseOver(e);
		}).on('mouseout', function(e){ //mouseout from element should remove anchor points
			elemento.removeAnchor(e);
		});

	

})