module.exports = {

	tempLineCreation: tempLineCreation,
	lineCreation: lineCreation,
	onBodyDeleteLine: onBodyDeleteLine

}

function tempLineCreation(){
	var objContOffset = $("#object_container").offset();
	var firstAnchorRect = interact.getElementRect(event.target);

	firstAnchorCenter = {
		x: firstAnchorRect.left + firstAnchorRect.width / 2,
		y: firstAnchorRect.top + firstAnchorRect.height / 2
	};

	var startAnchorID = $(event.target).attr('id');
	var reAnchParRect = JSON.parse($(event.target).attr('data'));

	// console.log(reAnchParRect.left);

    var newLine = document.createElementNS('http://www.w3.org/2000/svg','path');
	newLine.setAttribute('id','line1');
	newLine.setAttribute('fill','none');
	newLine.setAttribute("stroke", "black");
	newLine.setAttribute('stroke-width','2');
	$("svg").append(newLine);
	
		(function() {
			    document.onmousemove = handleMouseMove;
			    function handleMouseMove(event) {
			        var dot, eventDoc, doc, body, pageX, pageY;

			        event = event || window.event; // IE-ism

			        // If pageX/Y aren't available and clientX/Y are,
			        // calculate pageX/Y - logic taken from jQuery.
			        // (This is to support old IE)
			        if (event.pageX == null && event.clientX != null) {
			            eventDoc = (event.target && event.target.ownerDocument) || document;
			            doc = eventDoc.documentElement;
			            body = eventDoc.body;

			            event.pageX = event.clientX +
			              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
			              (doc && doc.clientLeft || body && body.clientLeft || 0);
			            event.pageY = event.clientY +
			              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
			              (doc && doc.clientTop  || body && body.clientTop  || 0);
			        }

			        var nl1x1 = firstAnchorCenter.x - objContOffset.left;
			        var nl1y1 = firstAnchorCenter.y - objContOffset.top;
			        var nl1x2 = ((firstAnchorCenter.x - objContOffset.left)+(event.pageX))/2;
			        var nl1y2 = firstAnchorCenter.y - objContOffset.top;
			        var nl1x3 =((firstAnchorCenter.x - objContOffset.left)+(event.pageX))/2;
			        var nl1y3 = event.pageY - objContOffset.top;
					var nl1x4 = '';
					var nl1y4 = '';
					var nl1x5 = '';
					var nl1y5 = '';
					var nl1x6 = event.pageX - objContOffset.left;
					var nl1y6 = event.pageY - objContOffset.top;

					var comma1 = ',';
					var comma2 = ',';
					var comma3 = ',';
					var comma4 = '';
					var comma5 = '';
					var comma6 = ',';

					var space1 = ' ';
					var space2 = '';
					var space3 = '';
					var space4 = ' ';

					var nlXDelta = (event.pageX - objContOffset.left) - nl1x1;//Revisit these. Might be a little messed up.
					var nlYDelta = nl1y1 - (event.pageY - objContOffset.top);//Revisit these. Might be a little messed up.
					// console.log('nlXDelta = ' + nlXDelta);
					// console.log('nlYDelta = ' + nlYDelta);
					// console.log("mouse " + (event.pageY - objContOffset.top));
					// console.log((reAnchParRect.top - objContOffset.top));

					// console.log(nlXDelta < 0);
					// console.log((event.pageY - objContOffset.top) > (reAnchParRect.top - objContOffset.top));
					// console.log((event.pageY - objContOffset.top) < (reAnchParRect.bottom - objContOffset.top));
					// console.log((event.pageX - objContOffset.left) < (reAnchParRect.left - objContOffset.left));
					// console.log(nlXDelta < 0 && (event.pageY - objContOffset.top) < (reAnchParRect.bottom - objContOffset.top) && (event.pageY - objContOffset.top) > (reAnchParRect.top - objContOffset.top) && (event.pageX - objContOffset.left) < (reAnchParRect.left - objContOffset.left))

					//To do: 1) Something weird broke for line extending to right where x delta is larger than y delta and 2) the condition for line 121 conflicts with an above condition

					//Chain these IFs
					if(startAnchorID == 'rightAnchor'){

						if(nlXDelta < Math.abs(nlYDelta) && nlXDelta >= 0){//Right anchor when x delta is smaller than y delta

							nl1x2 = event.pageX - objContOffset.left;
					        nl1x3 = '';
					        nl1y3 = '';

							comma3 = '';
							space1 = '';

						} else if(nlXDelta < 0 && Math.abs(nlXDelta) > Math.abs(nlYDelta)){//Right anchor when x delta is negative and y doesn't intersect with shape

							nl1x2 = nl1x1 + 20;//May need to make the value here dependent on overall scaling
							nl1x3 = nl1x2;

						} else if(nlXDelta < 0 && Math.abs(nlXDelta) < Math.abs(nlYDelta) && (event.pageX - objContOffset.left) < (reAnchParRect.left - objContOffset.left) && (event.pageY - objContOffset.top) < (reAnchParRect.top - objContOffset.top) || (event.pageY - objContOffset.top) > (reAnchParRect.bottom - objContOffset.top)){

							nl1x2 = nl1x1 + 20;//May need to make the value here dependent on overall scaling
							nl1x3 =	nl1x2;
					        nl1y3 = ((firstAnchorCenter.y - objContOffset.top)+(event.pageY - objContOffset.top))/2;
							nl1x4 = event.pageX - objContOffset.left;
							nl1y4 = ((firstAnchorCenter.y - objContOffset.top)+(event.pageY - objContOffset.top))/2;

							comma4 = ',';
							space2 = ' ';

						} else if(nlXDelta < 0 && (event.pageY - objContOffset.top) < (reAnchParRect.bottom - objContOffset.top) && (event.pageY - objContOffset.top) > (reAnchParRect.top - objContOffset.top) && (event.pageX - objContOffset.left) < (reAnchParRect.left - objContOffset.left)){
						//else if(nlXDelta < 0 && (event.pageY - objContOffset.top) > (reAnchParRect.top - objContOffset.top) && (event.pageY - objContOffset.top) < (reAnchParRect.bottom - objContOffset.top) && (event.pageX - objContOffset.left) < (reAnchParRect.left - objContOffset.left)){
							//Something is broken in this condition above...
							if(nlYDelta < 0){

								nl1x2 = nl1x1 + 20;//May need to make the value here dependent on overall scaling
								nl1x3 =	nl1x2;
								nl1y3 = (reAnchParRect.bottom - objContOffset.top) + 20;
								nl1x4 = (reAnchParRect.left - objContOffset.left) - (((reAnchParRect.left - objContOffset.left) - (event.pageX - objContOffset.left))/2);
								nl1y4 = (reAnchParRect.bottom - objContOffset.top) + 20;
								nl1x5 = (reAnchParRect.left - objContOffset.left) - (((reAnchParRect.left - objContOffset.left) - (event.pageX - objContOffset.left))/2);
								nl1y5 = event.pageY - objContOffset.top;

								comma4 = ',';
								comma5 = ',';
								space2 = ' ';
								space3 = ' ';

							} else if(nlYDelta > 0){

								nl1x2 = nl1x1 + 20;//May need to make the value here dependent on overall scaling
								nl1x3 =	nl1x2;
								nl1y3 = (reAnchParRect.top - objContOffset.top) - 20;
								nl1x4 = (reAnchParRect.left - objContOffset.left) - (((reAnchParRect.left - objContOffset.left) - (event.pageX - objContOffset.left))/2);
								nl1y4 = (reAnchParRect.top - objContOffset.top) - 20;
								nl1x5 = (reAnchParRect.left - objContOffset.left) - (((reAnchParRect.left - objContOffset.left) - (event.pageX - objContOffset.left))/2);
								nl1y5 = event.pageY - objContOffset.top;

								comma4 = ',';
								comma5 = ',';
								space2 = ' ';
								space3 = ' ';
								
							}
							// console.log('hi');

						} //else if(nlXDelta < 0 && (event.pageX - objContOffset.left) > (reAnchParRect.left - objContOffset.left)){
							//Make line disappear or something on this condition
						//}

					}

					$(newLine).attr('d','M ' + nl1x1 + comma1 + nl1y1 + ' L ' + nl1x2 + comma2 + nl1y2 + space1 + nl1x3 + comma3 + nl1y3 + space2 + nl1x4 + comma4 + nl1y4 + space3 + nl1x5 + comma5 + nl1y5 + space4 + nl1x6 + comma6 + nl1y6);
			    }
			})();

		return {x: firstAnchorCenter.x, y: firstAnchorCenter.y};

}

function lineCreation(){
	var objContOffset = $("#object_container").offset();
	var secondAnchorRect = interact.getElementRect(event.target);

	secondAnchorCenter = {
		x: secondAnchorRect.left + secondAnchorRect.width / 2,
		y: secondAnchorRect.top + secondAnchorRect.height / 2
	};

	var nl2x1 = firstAnchorCenter.x - objContOffset.left;
    var nl2y1 = firstAnchorCenter.y - objContOffset.top;
    var nl2x2 = ((firstAnchorCenter.x - objContOffset.left)+(secondAnchorCenter.x - objContOffset.left))/2;
    var nl2y2 = firstAnchorCenter.y - objContOffset.top;
    var nl2x3 = ((firstAnchorCenter.x - objContOffset.left)+(secondAnchorCenter.x - objContOffset.left))/2;
    var nl2y3 = secondAnchorCenter.y - objContOffset.top;
	var nl2x4 = secondAnchorCenter.x - objContOffset.left;
	var nl2y4 = secondAnchorCenter.y - objContOffset.top;

	var newLine2 = document.createElementNS('http://www.w3.org/2000/svg','path');
	newLine2.setAttribute('id','line2');
	newLine2.setAttribute('fill','none');
	newLine2.setAttribute("stroke", "black");
	newLine2.setAttribute('stroke-width','2');
	newLine2.setAttribute('d','M ' + nl2x1 +','+nl2y1+' L '+nl2x2 +','+nl2y2+' '+nl2x3 +','+nl2y3+' '+nl2x4 +','+nl2y4);
	$("svg").append(newLine2);

	$('#line1').remove();

	var startAnchorCenter = tempLineCreation();
	// var startAnchorX = startAnchorCenter.x;
	// var startAnchorY = startAnchorCenter.y;
	// console.log("x = " + startAnchorX + ", y = " + startAnchorY);
	// console.log(secondAnchorCenter.x);

	// var xLineDelta = startAnchorCenter.x - secondAnchorCenter.x;
	// var yLineDelta = startAnchorCenter.y - secondAnchorCenter.y;
	// console.log("xLineDelta is " + xLineDelta + " and yLineDelta is " + yLineDelta);
	// console.log(startAnchorCenter.x + ", " + secondAnchorCenter.x);//FIX THIS SHIT delta returns 0
}

function onBodyDeleteLine(){
	$('#line1').remove();
}