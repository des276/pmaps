var initial = require('./init.js');
var dropzone = require('./dropzone.js');
var elemento = require('./element.js');
var helper = require('./helper.js');
 
$(function(){
	initial.init();
	helper.disableTextWrapper();
	helper.enableTextWrapper();
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

	interact('.dropzone')
		.dropzone({
			overlap: 0.1,
			ondragenter: function(event){

				var dropRect = interact.getElementRect(event.target),
		        dropCenter = {
		          x: dropRect.left + dropRect.width  / 2,
		          y: dropRect.top  + dropRect.height / 2
		        };

		        // console.log(dropRect);
			    event.draggable.draggable({
			    	snap: {targets: [dropCenter]}
			    });

			    dropzone.DZHighlight(event);
			    		// $(event.target).addClass('hoverover');

			},

			//On drop of element for getting target dropzone attributes to pass to element and flip relevant space in array to 1
			ondrop: function(event){

				dropzone.onDropUpdatePos(event);
				dropzone.stopDZHighlight(event);
			},

			ondragleave: function(event){
				dropzone.onLeaveUpdatePos(event);

				event.draggable.draggable({
					snap: false
				});

				dropzone.stopDZHighlight(event);
			}
		}).on('click', function(el){
			// console.log(el);
		});

	

})