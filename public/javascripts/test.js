/**
	Create draggable element using svg.
	Should be first function run before attaching iteract.js handlers
**/
var init = function(){
	var dropHeight = $('.dropzone.first').height();
	var dropWidth = $('.dropzone.first').width();

	//add svg element before attaching interact.js handlers
	var svg = d3.select('svg');
	var arc = d3.symbol().type(d3.symbolTriangle);

	var line = svg.selectAll('path')
		.data([{x: (dropHeight/2), y: (dropWidth/2)}])
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', 'black')
		.attr('stroke', '#000')
		.attr('stroke-width', 1)
		.attr('transform', function(d){
			return 'translate(' + d.x + ', ' + d.y +')';
		})
		.attr('class', 'draggable')
		.attr('data-x', dropHeight/2)
		.attr('data-y', dropWidth/2)
	;
}

// Draggable element movement function
$(function() {
	init();

	var element = document.getElementsByClassName('.draggable'),
	    x = 0, y = 0;

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
			overlap: 0.1,
			ondragenter: function(event){

				var dropRect = interact.getElementRect(event.target),
		        dropCenter = {
		          x: dropRect.left + dropRect.width  / 2,
		          y: dropRect.top  + dropRect.height / 2
		        };

		        ;
			    event.draggable.draggable({
			    	snap: {targets: [dropCenter]}
			    });
			},
			ondragleave: function(event){
				event.draggable.draggable({
					snap: false
				});
			}
		});

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

//Sets initial row/column counts to 0
var xCount = 0;
var yCount = 0;

// Button function for adding dropzone rows
$('.button_horizontal').click(function () {
	
	  	xCount++

	  	//For everything after new rows have been added
	  	if (yCount != 0) {
			var tempCount = 0;

			for(tempCount=0; tempCount <= yCount; tempCount++) {
				$("#object_container").append('<div class="dropzone first" id="dropzone_x' + xCount + '_y'+ tempCount +'">');
				$('#dropzone_x' + xCount + '_y'+ tempCount).css({top: $('.dropzone.first').height() * tempCount, left: $('.dropzone.first').width() * xCount, position:'absolute'});
			};
		} else {
			//For before new rows have been added
			$("#object_container").append('<div class="dropzone first" id="dropzone_x' + xCount + '_y'+ yCount +'">');
			$('#dropzone_x' + xCount + '_y'+ yCount).css({top: $('.dropzone.first').height() * yCount, left: $('.dropzone.first').width() * xCount, position:'absolute'});			
		}
});

// Button function for adding dropzone columns
$('.button_vertical').click(function () {

		yCount++

		//For everything after new columns have been added
	  	if (xCount != 0) {
			var tempCount = 0;

			for(tempCount=0; tempCount <= xCount; tempCount++) {
				$("#object_container").append('<div class="dropzone first" id="dropzone_x' + tempCount + '_y'+ yCount +'">');
				$('#dropzone_x' + tempCount + '_y'+ yCount).css({top: $('.dropzone.first').height() * yCount, left: $('.dropzone.first').width() * tempCount, position:'absolute'});
			};
		} else {
			//For before new columns have been added
			$("#object_container").append('<div class="dropzone first" id="dropzone_x' + xCount + '_y'+ yCount +'">');
			$('#dropzone_x' + xCount + '_y'+ yCount).css({top: $('.dropzone.first').height() * yCount, left: $('.dropzone.first').width() * xCount, position:'absolute'});			
		}
});

});


// init();