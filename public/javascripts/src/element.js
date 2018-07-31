//grid and drop are the synonymous 
module.exports = {
	init: function(dropHeight, dropWidth, elArr){ //elements mechanics on page load
		setupClickCreate(dropHeight, dropWidth, elArr);
	}

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
	// var dragElement = function(e,xCoord,yCoord){
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

			console.log(line);

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

	// }
}

