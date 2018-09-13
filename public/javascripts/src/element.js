var linejs = require('./line.js');
var menujs = require('./menu.js'); // extends d3 functionality

//grid and drop are the synonymous 
module.exports = {
	init: function(dropHeight, dropWidth, elArr){ //elements mechanics on page load
		setupClickCreate(dropHeight, dropWidth, elArr);
		mouseClickBehavior();
	},
	dragMove: dragMove,
	toggleSelection: toggleSelection,
	updateDragEndStates: updateDragEndStates,
	elMouseOver: elMouseOver,
	removeAnchor: removeAnchor,
	elMouseOverMenu: elMouseOverMenu,
	elMouseOutMenu: elMouseOutMenu
	getStartAnchor: getStartAnchor,
	getEndAnchor: getEndAnchor
}


var clickHandlerEnabled = true;

/**
	Description:  get center of given element.  allows us to calculate offset.  Bbox is pre-transform values.
	TODO:  Put this into utility function file
**/
function getMyCentroid(element) {
    var bbox = element.getBBox();
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}

function mouseClickBehavior(){

	$('body') //this is how you do live updates of event listeners
	.on('mousedown mouseup',function(e){
		//make sure we don't override button behavior.  If button skip
		if($(e.target).is("button")){
			return;
		}
		
		//if not draggable element, then unfocus all selections on page
		// make sure shiftkey is not pressed
		// TODO:  for now only interacts with canvas.
		if((e.target.getAttribute('class')).indexOf('draggable') == -1){ 
			if(e.shiftKey == false){
				var pageEls = $('.selected'); // find all selected elements

				if(pageEls.length >= 1){ //if at least 1 element selected, remove select class and disable default click to create behavior
					
					clickHandlerEnabled = false;
					for(var i = 0; i < pageEls.length; i++){
						$(pageEls[i]).removeClass('selected');
						$(pageEls[i]).attr('stroke', 'black');
					}
				}
			}else{ //shiftKey is pressed
				clickHandlerEnabled = false;
			}

		}


	});
}

function setupClickCreate(dropHeight, dropWidth, elArr){
	// Click event handler
	$('body').on('click', '.dropzone', function(e){
		// if at least 1 element is selected, skip element creation

		if(clickHandlerEnabled == false){
			clickHandlerEnabled = true;
			return;
		}

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
	// console.log(event);	
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
	//multi select so skip normal flow of toggleSelection
	if(e.shiftKey && e.type == 'mouseup'){
		// check if selected. If 'dragend' class exists, then it was dragged.
		// if selected and shiftKey is pressed, then deselect element. otherwise select.
		if((e.target.getAttribute('class')).indexOf('selected') != -1){
			if((e.target.getAttribute('class')).indexOf('dragend') == -1){
				$(e.target).removeClass('selected');
				$(e.target).attr('stroke','black');
			}
		}else{
			$(e.target).addClass('selected');
			$(e.target).attr('stroke','red');
		}


	}else if(e.type == 'mouseup' && e.target){
		var pageEls = $('.selected');

		if($('.selected').length == 0){ //no elements selected
			// add class selected
			$(e.target).addClass('selected');
			// change element fill atr to signify selected
			$(e.target).attr('stroke','red');
		}else if($('.selected').length == 1){ // only 1 element is selected. 
			//if clicked element is already selected element, toggle off. 
			//if clicked element isn't selected element, remove selected from other element and select current clicked el
			if((e.target.getAttribute('class')).indexOf('selected') != -1){
				// $(e.target).removeClass('selected');
				// $(e.target).attr('stroke', 'black');
			}else{
				$(pageEls[0]).removeClass('selected');
				$(pageEls[0]).attr('stroke', 'black');

				$(e.target).addClass('selected');
				$(e.target).attr('stroke','red');
			}
		}
		else{ //1 or more elements selected
			//keep selection on current element. Remove selection for all other elements

		}
	}

	// if($('.selected').length == 0){ //no elements selected
	// 	if(e.type == 'mouseup' && e.target){
	// 		// if((e.target.getAttribute('class')).indexOf('dragend') == -1){ //dragend doesn't exist means it was clicked normally
	// 		// 	$(e.target).removeClass('selected');
	// 		// 	$(e.target).attr('stroke', 'black');
	// 		// }
	// 	}else{
	// 		// mousedown selected.  If already selected, don't add class
	// 		if((e.target.getAttribute('class')).indexOf('selected') == -1){
	// 			// add class selected
	// 			$(e.target).addClass('selected');
	// 			// change element fill atr to signify selected
	// 			$(e.target).attr('stroke','red');
	// 		}
	// 	}
	// }else{ // 1 or more elements selected
	// 	// if shift key is not pressed, switch focus
	// 	// remove focus on all elements
	// 	if(e.type == 'mouseup' && e.target){
	// 		// if((e.target.getAttribute('class')).indexOf('selected') != -1){ // element is already selected
	// 		// 	// remove focus
	// 		// 	$(e.target).removeClass('selected');
	// 		// 	$(e.target).attr('stroke', 'black');
	// 		// }

	// 		var pageEl = $('.selected');
	// 		for(var indEl in pageEl){
	// 			// console.log(pageEl[indEl]);
	// 		}
	// 		// for(var i = 0; i < $('.selected').length; i++){
	// 		// 	console.log($('.selected')[i]);
	// 		// 	$($('.selected')[i]).attr('stroke', 'black');
	// 		// 	$($('.selected')[i]).removeClass('selected');
				
	// 		// }

	// 		// add class selected
	// 		$(e.target).addClass('selected');
	// 		// change element fill atr to signify selected
	// 		$(e.target).attr('stroke','red');

	// 	}
	// }

	// if(e.type == 'mouseup' && e.target){
	// 	// check if selected. If 'dragend' class exists, then it was dragged.
	// 	if((e.toElement.getAttribute('class')).indexOf('selected') != -1){
	// 		if((e.target.getAttribute('class')).indexOf('dragend') == -1){ //dragend doesn't exist means it was clicked normally
	// 			$(e.target).removeClass('selected');
	// 			$(e.target).attr('stroke', 'black');
	// 		}
	// 	}else{
	// 		// mousedown selected.  If already selected, don't add class
	// 		if((e.target.getAttribute('class')).indexOf('selected') == -1){
	// 			// add class selected
	// 			$(e.target).addClass('selected');
	// 			// change element fill atr to signify selected
	// 			$(e.target).attr('stroke','red');
	// 		}
	// 	}

	// 	if((e.target.getAttribute('class')).indexOf('dragend') != -1){
	// 		$(e.target).removeClass('dragend');
	// 	}
	// }

	if((e.target.getAttribute('class')).indexOf('dragend') != -1){
		$(e.target).removeClass('dragend');
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
	var anchParRect = JSON.stringify(interact.getElementRect(e.target));
	// console.log(anchParRect);
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
		.attr('data',anchParRect)
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
		.attr('data',anchParRect)
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
		.attr('data',anchParRect)
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
		.attr('data',anchParRect)
		.attr('point-events', 'visible')
		.attr('transform', function(){
			return 'translate(' + (xPos+stuff.x) + ', ' + (yPos+stuff.y) +')';
		});

	//In progress function for dragging and drawing line.

	$('.elAnchor').on('mousedown mouseup', function(e){

		if(e.type == 'mousedown' && e.target){

			//re-eval if we need this here or can delete if moved to line.js
			getStartAnchor();
			firstAnchorPos = anchorCentPx(event);
			

			$('body').disableTextSelect();
			linejs.tempLineCreation();
		}

		if(e.type == 'mouseup' && e.target){

			//re-eval if we need this here or can delete if moved to line.js
			getEndAnchor();
			

			// console.log(firstAnchorPos.x);
			// console.log(secondAnchorPos);
			// console.log(firstAnchorPos.x - secondAnchorPos.x);
			// console.log(firstAnchorPos.y - secondAnchorPos.y);
			

			$('body').enableTextSelect();

			linejs.lineCreation();

			secondAnchorPos = anchorCentPx(event);//FYI placing this before linejs.lineCreation() causes that function to fail. Also may not need this in this file
			console.log(secondAnchorPos);

		} else {
			$('body').on('mouseup', function(event){
				linejs.onBodyDeleteLine();
			})
		}
	});

		// Anchor click handlers
		$('.elAnchor').on('click', function(event){
			// console.log('hi');

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


var control = {};
var data = [
        { icon : "https://github.com/favicon.ico", action: "segment 1" },
        { icon : "https://github.com/favicon.ico", action: "segment 2" },
        { icon : "https://github.com/favicon.ico", action: "segment 3" },
        { icon : "https://github.com/favicon.ico", action: "segment 4" }	
    ];

function elMouseOverMenu(e){
	d3.select('svg').append('g').attr('id', 'menu-holder');

	var m = new d3.radialMenu()
				.radius(50)
				.thickness(30)
				.appendTo('#menu-holder')
				.show(data);

	// setTimeout(function(d) {
	// 	$('#menu-holder').empty();
 //       // d3.select('#menu-holder').remove();
 //    }, 2000);

	// $(m).addClass('hello');
	// console.log(d3.select(m));
	// console.log(e);
	// var menu = new d3.radialMenu()
	// 				.appendTo(e)
	// 				.show(data)

	// var el = d3.select('#tmp');
	// 	var bbox = el.node().getBBox();
	// 	var dX = bbox.x + bbox.width/2;
	// 	var dY = bbox.y + bbox.height/2;
	// 	// console.log(dX, dY);
	// console.log(e);
		var menu = document.getElementById('menu-holder');

		var dX = 0;
		var dY = 0;
		// console.log(e.target.getAttribute('data-x'));
		var x = (parseFloat(e.target.getAttribute('data-x')) || 0) - dX;
    	var y = (parseFloat(e.target.getAttribute('data-y')) || 0) - dY;
		menu.style.webkitTransform ='translate(' + '300 ' + 'px, ' + y + 'px)';
	    menu.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

	//     // update the posiion attributes
	    // target.setAttribute('data-x', x);
	    // target.setAttribute('data-y', y);

	// 	$('#tmp').removeAttr('id');

	// 	target.setAttribute('data-xCoordEl', xCoord);
	//     target.setAttribute('data-yCoordEl', yCoord);


}

function elMouseOutMenu(e){
	d3.select('#menu-holder').remove();
}
	// console.log(e);
	// $('#menu-holder').empty();

function getStartAnchor(){ //May not need this in this file
	var startAnchorID = $(event.target).attr('id');
	// console.log('startAnchorID = ' + startAnchorID);
	return startAnchorID;
}

function getEndAnchor(){ //May not need this in this file
	var endAnchorID = $(event.target).attr('id');
	// console.log('endAnchorID = ' + endAnchorID);
	return endAnchorID;
}

function anchorCentPx(event){ //May not need this in this file
	var firstAnchorRect = interact.getElementRect(event.target);

	firstAnchorCenter = {
		x: firstAnchorRect.left + firstAnchorRect.width / 2,
		y: firstAnchorRect.top + firstAnchorRect.height / 2
	};

	return firstAnchorCenter;
}