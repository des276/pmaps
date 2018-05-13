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

// Element movement
// To dos:
// 1) Make sure elements stay within bounds of parent
// 2) Fix weird behavior; elements sometimes jumping away from cursor
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

	        // console.log(event.dx);


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
				// console.log(event);


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

	// console.log('width: ' + getContainerWidth('object_container'));
	// console.log('height: ' + getContainerHeight('object_container'));

var xCount = 0;
var yCount = 0;

// Button for adding in the horizontal direction
$('.button_horizontal').click(function () {
	// window.alert("button works");
	// console.log("button press");

	
	  	xCount++
		$("#object_container").append('<div class="dropzone first" id="dropzone_x' + xCount + '_y'+ yCount +'">');
		$('#dropzone_x' + xCount + '_y'+ yCount).css({top: 1, left: 200 * xCount, position:'absolute'});
		//To do 05.11.18/8:13PM | Need to fix how positioning works so that 1) it's cleaner and 2) it's flexible for what line you're on as currently it really just goes off the first anchor div


		//To do 05.11.18/8:46PM | id naming is kinda fucked up - need to make it name things by A1, A2, B1, B2 style positions
		//To do 05.11.18/8:57PM | Unfuck the loop so that it always fills shit out correctly
		// var newCount = 1;

		// for(i=0; i < newCount; i++) {

		// 	$("#object_container").append('<div class="dropzone first" id="nDropzone_' + newCount + '">');
		// 	$('#nDropzone_'+ newCount).css({top: 200 * newCount, left: 200 * xCount, position:'absolute'});
		// };

		// var newestDropzone = document.getElementById("dropzone_1");
		// console.log(newestDropzone.getAttribute('class'));
});

// Button for adding in the vertical direction
$('.button_vertical').click(function () {
	// window.alert("button works");
	// console.log("button press");

  	  	yCount++
		$("#object_container").append('<div class="dropzone first" id="dropzone_x' + xCount + '_y'+ yCount +'">');
		$('#dropzone_x' + xCount + '_y'+ yCount).css({top: 200 * yCount, left: 1, position:'absolute'});
});

// console.log($('.dropzone').height());

});


// init();