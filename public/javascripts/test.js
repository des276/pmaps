/**
	Create draggable element using svg.
	Should be first function run before attaching iteract.js handlers
**/
var init = function(){
	var elArr = []; // store elements in this array.  put this here for now until we figure out object structure.

	// var dropHeight = $('.dropzone')[0].height();
	// var dropWidth = $('.dropzone')[0].width();
	// console.log(dropWidth);
	var dropHeight = 120;
	var dropWidth = 120;
	
	dropzoneHighlight();  //box highlight
	createDragElement(dropHeight, dropWidth, elArr);  //setup dropzone click event handler
}


function createDragElement(dropHeight, dropWidth, elArr){

	/**
		Description:  get center of given element.  allows us to calculate offset.  Bbox is pre-transform values.
		TODO:  Put this into utility function file
	**/
	function getMyCentroid(element) {
	    var bbox = element.getBBox();
	    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
	}

	/**
		Description:  create a draggable element.  Adds each new object to 'elArr' array
	**/
	var dragElement = function(e){
		var left = parseInt($(e.target).css('left'));
		var top = parseInt($(e.target).css('top'));

		var boxArea = dropWidth*dropHeight;
		var triArea = (dropHeight*dropWidth)/4;

		var svg = d3.select('svg');
		var arc = d3.symbol().type(d3.symbolTriangle).size(triArea);

		elArr.push({
			x: dropHeight/2,
			y: dropWidth/2
		});


		var line = svg.selectAll('path')
			.data(elArr)
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', 'black')
			.attr('stroke', '#000')
			.attr('stroke-width', 1)
			.attr('transform', function(d){
				return 'translate(' + (left+(dropWidth/2)) + ', ' + ((top+(dropHeight/2))) +')';
			})
			.attr('class', 'draggable')
			.attr('id', 'tmp')
			.attr('data-x', (left+(dropWidth/2)))
			.attr('data-y', (top+(dropHeight/2)));


		//FIX centering issue
		// TODO:  Put this into separate function and call after above is complete.
		var el = d3.select('#tmp');
		var bbox = el.node().getBBox();
		var dX = bbox.x + bbox.width/2;
		var dY = bbox.y + bbox.height/2;
		var target = document.getElementById('tmp');

		var x = (parseFloat(target.getAttribute('data-x')) || 0) - dX;
    	var y = (parseFloat(target.getAttribute('data-y')) || 0) - dY;
		target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);

		$('#tmp').removeAttr('id');

	}


	// Click event handler
	$('body').on('click', '.dropzone', function(e){
		dragElement(e);
	})
}

function dropzoneHighlight(){
	$('body') //this is how you do live updates of event listeners
		.on('mouseover','.dropzone',function(e){
			$(e.currentTarget).addClass('hoverover');
		})
		.on('mouseout', '.dropzone',function(e){
			$(e.currentTarget).removeClass('hoverover');
		});
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

		        // console.log(dropRect);
			    event.draggable.draggable({
			    	snap: {targets: [dropCenter]}
			    });
			},
			ondragleave: function(event){
				event.draggable.draggable({
					snap: false
				});
			}
		}).on('click', function(el){
			// console.log(el);
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

//Grid initialization	
	var initXCount = 0;
	var initYCount = 0;
	//Set initial grid size
	var initRowSize = 3;
	var initColSize = 11;

	//First for loop expands rows
	for(initXCount=0; initXCount <= initRowSize; initXCount++) {
		$("#object_container").append('<div class="dropzone first" id="dropzone_x' + 0 + '_y'+ initXCount +'">');
		$('#dropzone_x' + 0 + '_y'+ initXCount).css({top: $('.dropzone.first').height() * initXCount, left: $('.dropzone.first').width() * 0, position:'absolute'});

			//Second for loop expands columns
			for(initYCount=1; initYCount <= initColSize; initYCount++) {
				$("#object_container").append('<div class="dropzone first" id="dropzone_x' + initYCount + '_y'+ initXCount +'">');
				$('#dropzone_x' + initYCount + '_y'+ initXCount).css({top: $('.dropzone.first').height() * initXCount, left: $('.dropzone.first').width() * initYCount, position:'absolute'});
			};
	};

	//Initialize 2D array
	var dzPosArray = new Array(initColSize)

	for (i=0; i < initColSize; i++)
	dzPosArray[i]=new Array(initRowSize)

	console.log(dzPosArray);
	console.log(dzPosArray[1]);

//To do 05.15.18/8:22PM | The initialization grid function above broke the add columns/rows functions. Need to fix.
//To do 05.15.18/8:28PM | Need to build in the expansion of the array during grid expansion.
//To do 05.15.18/8:29PM | Need to make more descriptive variable names here.
var yCount = initRowSize; //Keeps track of dropzone grid size in the y direction.
var xCount = initColSize; //Keeps track of dropzone grid size in the x direction.

//Button function for adding dropzone columns (later this will be triggered by elements nearing the edge, as well as button)
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

//Button function for adding dropzone rows (later this will be triggered by elements nearing the edge, as well as button)
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

//Button function for deleting dropzone columns (later this will be triggered by elements leaving the edge, as well as button)
$('.button_delete_horizontal').click(function () {
	
		if(xCount > 0) {
				for(tempCount=0; tempCount <= yCount; tempCount++) {
				$("#dropzone_x" + xCount + "_y"+ tempCount).remove();
			}
			xCount--
		}

});

//Button function for deleting dropzone rows (later this will be triggered by elements leaving the edge, as well as button)
$('.button_delete_vertical').click(function () {
	
		if(yCount > 0) {
				for(tempCount=0; tempCount <= xCount; tempCount++) {
				$("#dropzone_x" + tempCount + "_y"+ yCount).remove();
			}
			yCount--
		}
});

});


// init();