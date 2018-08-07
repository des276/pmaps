module.exports = {
	tempLineCreation: function(){
		var objContOffset = $("#object_container").offset();
		var firstAnchorRect = interact.getElementRect(event.target);
		firstAnchorCenter = {
			x: firstAnchorRect.left + firstAnchorRect.width / 2,
			y: firstAnchorRect.top + firstAnchorRect.height / 2
		};

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
				              (doc && doc.clientTop  || body && body.clientTop  || 0 );
				        }

				        var nl1x1 = firstAnchorCenter.x - objContOffset.left;
				        var nl1y1 = firstAnchorCenter.y - objContOffset.top;
				        var nl1x2 = ((firstAnchorCenter.x - objContOffset.left)+(event.pageX))/2;
				        var nl1y2 = firstAnchorCenter.y - objContOffset.top;
				        var nl1x3 =((firstAnchorCenter.x - objContOffset.left)+(event.pageX))/2;
				        var nl1y3 = event.pageY - objContOffset.top;
							var nl1x4 = event.pageX - objContOffset.left;
							var nl1y4 = event.pageY - objContOffset.top;

						$(newLine).attr('d','M ' + nl1x1 +','+nl1y1+' L '+nl1x2 +','+nl1y2+' '+nl1x3 +','+nl1y3+' '+nl1x4 +','+nl1y4);
				        // Use event.pageX / event.pageY here
				    }
				})();

	},
	lineCreation: function(){
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
	},
	onBodyDeleteLine: function(){
		$('#line1').remove();
	}


}