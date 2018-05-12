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
				// mode: 'anchor',
				// anchors: [],
				// range: Infinity,
				// elementOrigin: { x: 0.5, y: 0.5 },
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
			// console.log(event);
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
			overlap: 0.1	,
			ondragenter: function(event){
				// console.log(event);


				var dropRect = interact.getElementRect(event.target),
		        dropCenter = {
		          x: dropRect.left + dropRect.width  / 2,
		          y: dropRect.top  + dropRect.height / 2
		        };

		        // dropCenter.x = 400
		        ;
			    event.draggable.draggable({
			    	snap: {targets: [dropCenter]}
			    });
			    console.log(dropRect);
			    console.log(dropCenter);

				// console.log(event.draggable.draggable(	));
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

	console.log('width: ' + getContainerWidth('object_container'));
	console.log('height: ' + getContainerHeight('object_container'));

// Button for adding in the horizontal direction

var horzCount = 0;
$('.button_horizontal').click(function () {
	// window.alert("button works");
	// console.log("button press");

	
	  	horzCount++
		$("#object_container").append('<div class="dropzone first" id="hDropzone_' + horzCount + '">');
		$('#hDropzone_'+ horzCount).css({top: 1, left: 200 * horzCount, position:'absolute'});
		//To do 05.11.18/8:13PM | Need to fix how positioning works so that 1) it's cleaner and 2) it's flexible for what line you're on as currently it really just goes off the first anchor div


		//To do 05.11.18/8:46PM | id naming is kinda fucked up - need to make it name things by A1, A2, B1, B2 style positions
		//To do 05.11.18/8:57PM | Unfuck the loop so that it always fills shit out correctly
		var newCount = 1;

		for(i=0; i < newCount; i++) {

			$("#object_container").append('<div class="dropzone first" id="nDropzone_' + newCount + '">');
			$('#nDropzone_'+ newCount).css({top: 200 * newCount, left: 200 * horzCount, position:'absolute'});
		};

		// var newestDropzone = document.getElementById("dropzone_1");
		// console.log(newestDropzone.getAttribute('class'));
});

// Button for adding in the vertical direction

var vertCount = 0;
$('.button_vertical').click(function () {
	// window.alert("button works");
	console.log("button press");

  	  	vertCount++
		$("#object_container").append('<div class="dropzone first" id="vDropzone_' + vertCount + '">');
		$('#vDropzone_'+ vertCount).css({top: 200 * vertCount, left: 1, position:'absolute'});
});

console.log($('.dropzone').height());

});