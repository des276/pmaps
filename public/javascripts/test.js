/**
	Create draggable element using svg.
	Should be first function run before attaching iteract.js handlers
**/
var init = function(){
	SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {
	  return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
	};

	var elArr = []; // store elements in this array.  put this here for now until we figure out object structure.

	// var dropHeight = $('.dropzone')[0].height();
	// var dropWidth = $('.dropzone')[0].width();
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
	var dragElement = function(e,xCoord,yCoord){
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

		// var data = [{
		// 	x: dropHeight/2,
		// 	y: dropWidth/2
		// }];

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
		// console.log(dX, dY);
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

		target.setAttribute('data-xCoordEl', xCoord);
	    target.setAttribute('data-yCoordEl', yCoord);
	}


	// Click event handler
	$('body').on('click', '.dropzone', function(e){
		//Gets coords of clicked DZ for array and el
		var clickDZxCoord = $(event.target).attr("data-xCoordDZ");
		var clickDZyCoord = $(event.target).attr("data-yCoordDZ");

		dragElement(e,clickDZxCoord,clickDZyCoord);
		
		// console.log(clickDZxCoord + ", " + clickDZyCoord);
		//To do 05.28.18/7:28PM | Doesn't recognize the array in click event handler function. Need to figure out.
		// dzPosArr[clickDZxCoord][clickDZyCoord] = 1; //Sets related position in array to 1, showing it is occupied
		// console.log(dzPosArr[clickDZxCoord][clickDZyCoord]);
		//To do 05.28.18/7:30PM | Need to get with Des to figure out how to ID el to pass target DZ coords as attrs
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
	var elDZtraverseCount = 0; //Var to count the number of DZs traversed during ondragleave for purposes of getting the first one

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
			$('.elAnchor').remove(); // remove anchor points mouse over effect on drag

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
		})
		.on('mouseover', function(e){
			var xPos = parseFloat($(e.target).attr('data-x'));
			var yPos = parseFloat($(e.target).attr('data-y'));
			var bbox = e.target.getBBox();
			// console.log(eDims);
			var domPoint = new DOMPoint(e.x, e.y);
			// domPoint = new SVGPoint();
			var stuff = e.path[1].createSVGPoint()

			stuff.x = 0;
			stuff.y = 0;
			// console.log(x);
			// console.log(e.path[1].getScreenCTM().inverse());
			// x.x = e.clientX;
			// x.y = e.clientY;

			// x = x.matrixTransform(e.path[1].getScreenCTM().inverse());
			// var globalToLocal = (e.target.getTransformToElement(e.path[1]).inverse());
			// // var m = el.getTransformToElement(svg).inverse();
			// var globalToLocal = dragObject.getTransformToElement(svg).inverse();
			// var inObjectSpace = x.matrixTransform(globalToLocal);
			// console.log(inObjectSpace);
			// console.log(e.path[0].isPointInFill(inObjectSpace));


			// var rightAnchorX = 0;
			// var rightAnchorY = 0;
			// var counter = 0;
			// stuff.y = 

			var dX = bbox.x + bbox.width/2;
			var dY = bbox.y + bbox.height/2;
			stuff.y = stuff.y + dY;
			while(e.path[0].isPointInStroke(stuff) != true){
				stuff.x++;
			}

			// stuff = stuff.matrixTransform(e.path[0].getScreenCTM().inverse());
			// var localToGlobal = (e.path[1].getTransformToElement(e.target).inverse());
			// stuff = stuff.matrixTransform(e.path[1].getScreenCTM().inverse());

			// stuff.x = stuff.x - dX;
			// stuff.y = stuff.y - dY;
			console.log(stuff);

			// var p = e.target.getPathData()[0]
			// <circle xmlns="http://www.w3.org/2000/svg" id="point-handle" r="10" x="0" y="0" stroke-width="4" fill="#fff" fill-opacity="0.4" stroke="#fff"/>
			// console.log(e.target.getPathData());
			// console.log($(e.target).attr('data-x'));
			// console.log(e);
			// console.log(d3.select(e).node());

			/** RIGHT ANCHOR **/
			d3.select('svg')
				.append('circle')
				.attr('r', 4.5)
				.attr("class", "elAnchor")
				.attr('fill', 'red')
				.attr('transform', function(){
					// console.log(eDims.y);
					// console.log(eDims.height);
					return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
				});

			/** LEFT ANCHOR **/
			d3.select('svg')
				.append('circle')
				.attr('r', 4.5)
				.attr("class", "elAnchor")
				.attr('fill', 'red')
				.attr('transform', function(){
					return 'translate(' + (xPos-stuff.x) + ', ' + (yPos+stuff.y) +')';
				});


			stuff.x = 0;
			stuff.y = 0;
			stuff.y = stuff.y + dY;
			while(e.path[0].isPointInStroke(stuff) != true){
				// stuff.x++;
				stuff.y++;
			}

			/** BOTTOM ANCHOR **/
			d3.select('svg')
				.append('circle')
				.attr('r', 4.5)
				.attr("class", "elAnchor")
				.attr('fill', 'red')
				.attr('transform', function(){
					return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
			});

			console.log(yPos);
			console.log(stuff.y);

			stuff.y = 0;
			stuff.y = stuff.y + dY;
			while(e.path[0].isPointInStroke(stuff) != true){
				// stuff.x++;
				stuff.y--;
			}
			/** TOP ANCHOR **/
			d3.select('svg')
				.append('circle')
				.attr('r', 4.5)
				.attr("class", "elAnchor")
				.attr('fill', 'red')
				.attr('transform', function(){
					return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
			});

			// console.log($('.origin'));

		}).on('mouseout', function(){
			$('.elAnchor').remove();
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

			    $(event.target).addClass('hoverover');
			},

			//On drop of element for getting target dropzone attributes to pass to element and flip relevant space in array to 1
			ondrop: function(event){
				var dropDZxCoord = $(event.target).attr("data-xCoordDZ");
				var dropDZyCoord = $(event.target).attr("data-yCoordDZ");
				dzPosArr[dropDZxCoord][dropDZyCoord] = 1; //Sets related position in array to 1, showing it is occupied

				//Gives the el attributes reflecting its current x/y position
				$(event.draggable).attr("data-xCoordEl",dropDZxCoord);
				$(event.draggable).attr("data-yCoordEl",dropDZyCoord);

				elDZtraverseCount = 0;//Resets traversal count to 0 as current traversal has ended

				$(event.target).removeClass('hoverover');
			},

			ondragleave: function(event){
				elDZtraverseCount++//Counts the number of DZs traversed during ondragleave for purposes of getting the first one
				//After only the first traversal, gets the dropzone coords
				if(elDZtraverseCount==1){
					var leaveDZxCoord = $(event.target).attr("data-xCoordDZ");
					var leaveDZyCoord = $(event.target).attr("data-yCoordDZ");
					dzPosArr[leaveDZxCoord][leaveDZyCoord] = 0;//Sets new value to array which el left to zero
				}

				event.draggable.draggable({
					snap: false
				});

				$(event.target).removeClass('hoverover');
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

});

//Grid expansion function
function gridExpand(xCoord,yCoord){
	$("#object_container").append('<div class="dropzone first" data-xCoordDZ=' + xCoord + ' data-yCoordDZ='+ yCoord +'>');
	$('.dropzone[data-xCoordDZ=' + xCoord + '][data-yCoordDZ='+ yCoord +']').css({left: $('.dropzone.first').width() * xCoord, top: $('.dropzone.first').height() * yCoord, position:'absolute'});
}

//Grid contraction function
function gridContract(xCoord,yCoord){
	$('.dropzone[data-xCoordDZ=' + xCoord + '][data-yCoordDZ='+ yCoord +']').remove();
}

//Container sizing function
function sizeObjCont(xCoord,yCoord){
	var contWidthPx = $('.dropzone.first').width() * (xCoord+1);
	var contHeightPx = $('.dropzone.first').height() * (yCoord+1);
	$("#object_container").css({width: contWidthPx, height: contHeightPx});
	$("#object_container_overlay").css({width: contWidthPx, height: contHeightPx});//Temp; need to get rid of the overlay, but some dependency is causing issues.
}

//Grid functions
$(function() {

	//Grid initialization	
		var initXCoord = 0;
		var initYCoord = 0;
		//Set initial grid size
		var initRowSize = 3;
		var initColSize = 11;

		//First for loop expands rows
		for(initYCoord=0; initYCoord <= initRowSize; initYCoord++) {
			gridExpand(0,initYCoord);
				//Second for loop expands columns
				for(initXCoord=1; initXCoord <= initColSize; initXCoord++) {
					gridExpand(initXCoord,initYCoord);
				};
		};

		sizeObjCont(initColSize,initRowSize);

		//Initialize 2D array
		var dzPosArr = new Array(initColSize+1);

		for (i=0; i < (initColSize+1); i++) {
			dzPosArr[i]=new Array(initRowSize+1);
		};

	var xDZCoord = initColSize; //Keeps track of dropzone grid size in the x direction.
	var yDZCoord = initRowSize; //Keeps track of dropzone grid size in the y direction.

	//Button function for adding dropzone columns (later this will be triggered by elements nearing the edge, as well as button)
	$('.button_horizontal').click(function () {
		  	xDZCoord++
		  	//For everything after new rows have been added
		  	if (yDZCoord != 0) {
				var tempCount = 0;
				for(tempCount=0; tempCount <= yDZCoord; tempCount++) {
					gridExpand(xDZCoord,tempCount);
				};
			} else {
				//For before new rows have been added
				gridExpand(xDZCoord,yDZCoord);
			}
			//Increase array in the x direction with same size rows in the new x slot
			dzPosArr.length = xDZCoord+1;
			for (i=xDZCoord; i < (xDZCoord+1); i++) {
				dzPosArr[i]=new Array(yDZCoord+1);
			};

			sizeObjCont(xDZCoord,yDZCoord);
	});

	//Button function for adding dropzone rows (later this will be triggered by elements nearing the edge, as well as button)
	$('.button_vertical').click(function () {
			yDZCoord++
			//For everything after new columns have been added
		  	if (xDZCoord != 0) {
				var tempCount = 0;
				for(tempCount=0; tempCount <= xDZCoord; tempCount++) {
					gridExpand(tempCount,yDZCoord);
				};
			} else {
				//For before new columns have been added
				gridExpand(xDZCoord,yDZCoord);
			}
			//Increase array in the y direction
			for (i=0; i < (xDZCoord+1); i++) {
				dzPosArr[i].length++;
			};

			sizeObjCont(xDZCoord,yDZCoord);
	});

	//Button function for deleting dropzone columns (later this will be triggered by elements leaving the edge, as well as button)
	$('.button_delete_horizontal').click(function () {
			if(xDZCoord > 0) {
					for(tempCount=0; tempCount <= yDZCoord; tempCount++) {
						gridContract(xDZCoord,tempCount);
				}
				xDZCoord--
				//Decrease array in the x direction
				dzPosArr.length = xDZCoord+1;
			}

			sizeObjCont(xDZCoord,yDZCoord);
	});

	//Button function for deleting dropzone rows (later this will be triggered by elements leaving the edge, as well as button)
	$('.button_delete_vertical').click(function () {
			if(yDZCoord > 0) {
					for(tempCount=0; tempCount <= xDZCoord; tempCount++) {
						gridContract(tempCount,yDZCoord);
				}
			//Decrease array in the y direction
			for (i=0; i < (xDZCoord+1); i++) {
				dzPosArr[i].length--;
			};
				yDZCoord--
			}

			sizeObjCont(xDZCoord,yDZCoord);
	});

});