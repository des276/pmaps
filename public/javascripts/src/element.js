var linejs = require('./line.js');

//grid and drop are the synonymous 
module.exports = {
	init: function(dropHeight, dropWidth, elArr){ //elements mechanics on page load
		setupClickCreate(dropHeight, dropWidth, elArr);
	},
	dragMove: dragMove,
	toggleSelection: toggleSelection,
	updateDragEndStates: updateDragEndStates,
	elMouseOver: elMouseOver,
	removeAnchor: removeAnchor

}

/**
	Description:  get center of given element.  allows us to calculate offset.  Bbox is pre-transform values.
	TODO:  Put this into utility function file
**/
function getMyCentroid(element) {
    var bbox = element.getBBox();
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}

function setupClickCreate(dropHeight, dropWidth, elArr){
	// Click event handler
	$('body').on('click', '.dropzone', function(e){
		//Gets coords of clicked DZ for array and el
		var clickDZxCoord = $(event.target).attr("data-xCoordDZ");
		var clickDZyCoord = $(event.target).attr("data-yCoordDZ");

		// console.log(e);
		dragElement(e,clickDZxCoord,clickDZyCoord, dropHeight, dropWidth, elArr);
		
		// console.log(clickDZxCoord + ", " + clickDZyCoord);
		//To do 05.28.18/7:28PM | Doesn't recognize the array in click event handler function. Need to figure out.
		// dzPosArr[clickDZxCoord][clickDZyCoord] = 1; //Sets related position in array to 1, showing it is occupied
		// console.log(dzPosArr[clickDZxCoord][clickDZyCoord]);
		//To do 05.28.18/7:30PM | Need to get with Des to figure out how to ID el to pass target DZ coords as attrs
	})
}

function dragElement(e, xCoord, yCoord, dropHeight, dropWidth, elArr){
		/**
			Description:  create a draggable element.  Adds each new object to 'elArr' array
		**/
		var left = parseInt($(e.target).css('left'));
		var top = parseInt($(e.target).css('top'));

		var boxArea = dropWidth*dropHeight;
		var triArea = (dropHeight*dropWidth)/4;

		var svg = d3.select('svg');
		var arc = d3.symbol().type(d3.symbolSquare).size(triArea);

		elArr.push({
			x: dropHeight/2,
			y: dropWidth/2,
			test: 'test data'
		});

		var line = svg.selectAll()		//'path')
			// .data(elArr)
			.data([{
			x: dropHeight/2,
			y: dropWidth/2,
			test: 'test data'
			}])
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

			// console.log(line);

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

function dragMove(event){
	var selectedElements = $('.selected');

	if(selectedElements.length > 0){  // multiple el need to be moved
		if((event.target.getAttribute('class')).indexOf('selected') != -1){
			var selectedLen = selectedElements.length;
			
			// console.log(event.dx, event.dy);
			for(var i=0; i<selectedLen; i++){

				var x = (parseFloat(selectedElements[i].getAttribute('data-x')) || 0) + event.dx;
				var y = (parseFloat(selectedElements[i].getAttribute('data-y')) || 0) + event.dy;

				// translate the element
			    selectedElements[i].style.webkitTransform =
			    selectedElements[i].style.transform =
			      'translate(' + x + 'px, ' + y + 'px)';

			    // update the posiion attributes
			    selectedElements[i].setAttribute('data-x', x);
			    selectedElements[i].setAttribute('data-y', y);
			}
		}
	}else{

		// Selected stroke added here for single element click and drag instead of in mouseup/mousedown event handler
		// Solves having to click to select before being able to drag the element
		if(event.target){
			// mousedown selected.  If already selected, don't add class
			if((event.target.getAttribute('class')).indexOf('selected') == -1){
				// add class selected
				$(event.target).addClass('selected');
				// change element fill atr to signify selected
				$(event.target).attr('stroke','red');
			}
		}
	}

	$('.elAnchor').remove(); // remove anchor points mouse over effect on drag

	if((event.target.getAttribute('class')).indexOf('dragging') == -1){ // check if 'dragging' class exists
		// add dragging class if it doesn't exist already
		$(event.target).addClass('dragging');
	}
}

function toggleSelection(e){
	if(e.type == 'mouseup' && e.target){


		// check if selected. If 'dragend' class exists, then it was dragged.
		if((e.toElement.getAttribute('class')).indexOf('selected') != -1){
			if((e.target.getAttribute('class')).indexOf('dragend') == -1){ //dragend doesn't exist means it was clicked normally
				$(e.target).removeClass('selected');
				$(e.target).attr('stroke', 'black');
			}
		}else{
			// mousedown selected.  If already selected, don't add class
			if((e.target.getAttribute('class')).indexOf('selected') == -1){
				// add class selected
				$(e.target).addClass('selected');
				// change element fill atr to signify selected
				$(e.target).attr('stroke','red');
			}
		}

		if((e.target.getAttribute('class')).indexOf('dragend') != -1){
			$(e.target).removeClass('dragend');
		}
	}

	// if(e.type == 'mousedown' && e.target){
	// 	if((e.target.getAttribute('class')).indexOf('selected') != - 1){
	// 		$(e.target).addClass('selected');
	// 		$(e.target).attr('stroke', 'red');
	// 	}
	// }

}

function updateDragEndStates(event){
	//ON DRAGEND
	$(event.target).removeClass('dragging');
	$(event.target).addClass('dragend');
}

function elMouseOver(e){
	if($('.elAnchor')[0]){
		$('#groupAnchors').remove();
	}

	var xPos = parseFloat($(e.target).attr('data-x'));
	var yPos = parseFloat($(e.target).attr('data-y'));
	var bbox = e.target.getBBox();
	// console.log(eDims);
	var domPoint = new DOMPoint(e.x, e.y);
	// domPoint = new SVGPoint();
	var stuff = e.path[1].createSVGPoint()

	stuff.x = 0;
	stuff.y = 0;
	

	var dX = bbox.x + bbox.width/2;
	var dY = bbox.y + bbox.height/2;
	stuff.y = stuff.y + dY;
	while(e.path[0].isPointInStroke(stuff) != true){
		stuff.x++;
	}


	var groupIt = d3.select('svg')
		.append('g')
		.attr('id', 'groupAnchors');

	/** RIGHT ANCHOR **/
	groupIt
		.append('circle')
		.attr('r', 4.5)
		.attr("class", "elAnchor")
		.attr("id", "rightAnchor")
		.attr('fill', 'red')
		.attr('transform', function(){
			// console.log(eDims.y);
			// console.log(eDims.height);
			return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
		});

	/** LEFT ANCHOR **/
	groupIt
		.append('circle')
		.attr('r', 4.5)
		.attr("class", "elAnchor")
		.attr("id", "leftAnchor")
		.attr('fill', 'red')
		.attr('transform', function(){
			return 'translate(' + (xPos-stuff.x) + ', ' + (yPos+stuff.y) +')';
		});


	stuff.x = 0;
	stuff.y = 0;
	stuff.y = stuff.y + dY;
	while(e.path[0].isPointInStroke(stuff) != true){
		stuff.y++;
	}

	/** BOTTOM ANCHOR **/
	groupIt
		.append('circle')
		.attr('r', 4.5)
		.attr("class", "elAnchor")
		.attr("id", "bottomAnchor")
		.attr('fill', 'red')
		.attr('transform', function(){
			return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
	});


	stuff.y = 0;
	stuff.y = stuff.y + dY;
	while(e.path[0].isPointInStroke(stuff) != true){
		stuff.y--;
	}
	/** TOP ANCHOR **/
	groupIt
		.append('circle')
		// .remove()
		.attr('r', 4.5)
		.attr("class", "elAnchor")
		.attr("id", "topAnchor")
		.attr('fill', 'red')
		.attr('point-events', 'visible')
		.attr('transform', function(){
			return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
		});

	//In progress function for dragging and drawing line.

	$('.elAnchor').on('mousedown mouseup', function(e){

		if(e.type == 'mousedown' && e.target){

			$('body').disableTextSelect();
			linejs.tempLineCreation();
		}

		if(e.type == 'mouseup' && e.target){

			$('body').enableTextSelect();

			linejs.lineCreation();

		} else {
			$('body').on('mouseup', function(event){
				linejs.onBodyDeleteLine();
			})
		}
	});

		// Anchor click handlers
		$('.elAnchor').on('click', function(event){
			console.log('hi');

		}).on('mouseout', function(e){ //anchor mouseout should remove anchor points
			if(e.toElement != null){
				if((e.toElement.getAttribute('class')).indexOf('dropzone') == -1 || (e.toElement.getAttribute('class')).indexOf('elAnchor') == -1){
					$('#groupAnchors').remove();
				}
			}
		});
}

function removeAnchor(e){
	if(e.toElement != null){
		if(e.toElement.getAttribute('class') != 'elAnchor'){
			$('#groupAnchors').remove();
		}
	}
}

