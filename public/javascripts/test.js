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
	      targets: [
	        interact.createSnapGrid({ x: 30, y: 30 })
	      ],
	      range: Infinity,
	      relativePoints: [ { x: 0, y: 0 } ]
	    },
	    restrict: {
	      restriction: element.parentNode,
	      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
	      endOnly: true
	    }
	  })
	  .on('dragmove', function (event) {
	    x += event.dx;
	    y += event.dy;

	    event.target.style.webkitTransform =
	    event.target.style.transform =
	        'translate(' + x + 'px, ' + y + 'px)';
	  });
});