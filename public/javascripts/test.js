// Element movement
// To dos:
// 1) Make sure elements stay within bounds of parent
// 2) Fix weird behavior; elements sometimes jumping away from cursor
$(function() {
// alert('hi');

	var element = document.getElementsByClassName('.draggable'),
	    x = 0, y = 0;

	interact('.draggable')
		.draggable({
			snap: {
				mode: 'anchor',
				anchors: [],
				range: Infinity,
				elementOrigin: { x: 0.5, y: 0.5 },
				endOnly: true
			},
			restrict: {
		  		restriction: 'parent',
	  			elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
		  		endOnly: true
			}
		})
		.on('dragmove', function (event) {
			var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
		});

	interact('.dropzone')
		.dropzone({
			overlap: 0.2,
			ondragenter: function(event){
				var dropRect = interact.getElementRect(event.target),
		        dropCenter = {
		          x: dropRect.left + dropRect.width  / 2,
		          y: dropRect.top  + dropRect.height / 2
		        };

			    event.draggable.draggable({
			    	snap: {targets: [dropCenter]}
			    });
			    console.log(dropCenter);
				console.log(event.draggable.draggable());
			},
			ondragleave: function(event){
				event.draggable.draggable({
					snap: false
				});
			}
		});

//   .on('dragleave', function (event) {
    // event.draggable.snap(false);
  // });


	/**
		param: id (string)
	**/
	function getContainerWidth(elName){
		return $('#' + elName).width();
	}

	/**
		param:  id (string)
	**/
	function getContainerHeight(elName){
		return $('#' + elName).height();
	}

	console.log('width: ' + getContainerWidth('object_container'));
	console.log('height: ' + getContainerHeight('object_container'));
});



