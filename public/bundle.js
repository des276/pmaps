!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e){t.exports={init:function(){!function(t){n.dropWidth=t}(120),function(t){n.dropHeight=t}(120),$("body").on("mouseover",".dropzone",function(t){$(t.currentTarget).addClass("hoverover")}).on("mouseout",".dropzone",function(t){$(t.currentTarget).removeClass("hoverover")})},getDropDimensions:function(){return n},getElArr:function(){return r},getGridCoordinates:function(){return o}};var r=[],n={dropHeight:0,dropWidth:0},o={initXCoord:0,initYCoord:0,initRowSize:0,initColSize:11}},function(t,e,r){var n=r(0),o=r(2),a=r(3);$(function(){n.init();var t=n.getDropDimensions();o.startGrid(),o.initDzArr(),o.addXDZ(),o.addYDZ(),o.deleteXDZ(),o.deleteYDZ(),o.deleteEls(),a.init(t.dropHeight,t.dropWidth,n.getElArr()),interact(".draggable").draggable({snap:{relativePoints:[{x:.5,y:.5}],endOnly:!0},restrict:{restriction:"parent",elementRect:{top:0,left:0,bottom:1,right:1},endOnly:!0},inertia:!1}).on("dragmove",function(t){a.dragMove(t)}).on("mousedown mouseup",function(t){a.toggleSelection(t)}).on("dragend",function(t){a.updateDragEndStates(t)}).on("mouseover",function(t){a.elMouseOver(t)}).on("mouseout",function(t){a.removeAnchor(t)})})},function(t,e,r){r(0);function n(t,e){$("#object_container").append('<div class="dropzone first" data-xCoordDZ='+t+" data-yCoordDZ="+e+">"),$(".dropzone[data-xCoordDZ="+t+"][data-yCoordDZ="+e+"]").css({left:$(".dropzone.first").width()*t,top:$(".dropzone.first").height()*e,position:"absolute"})}function o(t,e){$(".dropzone[data-xCoordDZ="+t+"][data-yCoordDZ="+e+"]").remove()}function a(t,e){var r=$(".dropzone.first").width()*(t+1),n=$(".dropzone.first").height()*(e+1);$("#object_container").css({width:r,height:n}),$("#object_container_overlay").css({width:r,height:n})}var l=0,s=0,c=11,d=3,u=new Array(12),f={initXCoord:0,initYCoord:0,initRowSize:3,initColSize:11};t.exports={startGrid:function(){for(s=0;s<=3;s++)for(n(0,s),l=1;l<=11;l++)n(l,s);a(11,3)},initDzArr:function(){for(i=0;i<12;i++)u[i]=new Array(4)},addXDZ:function(){$(".button_horizontal").click(function(){if(c++,0!=d){var t=0;for(t=0;t<=d;t++)n(c,t)}else n(c,d);for(u.length=c+1,i=c;i<c+1;i++)u[i]=new Array(d+1);a(c,d)})},addYDZ:function(){$(".button_vertical").click(function(){if(d++,0!=c){var t=0;for(t=0;t<=c;t++)n(t,d)}else n(c,d);for(i=0;i<c+1;i++)u[i].length++;a(c,d)})},deleteXDZ:function(){$(".button_delete_horizontal").click(function(){if(c>0){for(tempCount=0;tempCount<=d;tempCount++)o(c,tempCount);c--,u.length=c+1}a(c,d)})},deleteYDZ:function(){$(".button_delete_vertical").click(function(){if(d>0){for(tempCount=0;tempCount<=c;tempCount++)o(tempCount,d);for(i=0;i<c+1;i++)u[i].length--;d--}a(c,d)})},deleteEls:function(){$(".delete_elements").click(function(){for(var t=$(".selected").length,e=0;e<t;e++)elArr.pop();$(".selected").remove()})},getGridCoordinates:function(){return f}}},function(t,e){t.exports={init:function(t,e,r){!function(t,e,r){$("body").on("click",".dropzone",function(n){var o=$(event.target).attr("data-xCoordDZ"),a=$(event.target).attr("data-yCoordDZ");!function(t,e,r,n,o,a){var i=parseInt($(t.target).css("left")),l=parseInt($(t.target).css("top")),s=n*o/4,c=d3.select("svg"),d=d3.symbol().type(d3.symbolSquare).size(s);a.push({x:n/2,y:o/2,test:"test data"});var u=c.selectAll().data([{x:n/2,y:o/2,test:"test data"}]).enter().append("path").attr("d",d).attr("fill","black").attr("stroke","#000").attr("stroke-width",1).attr("transform",function(t){return"translate("+(i+o/2)+", "+(l+n/2)+")"}).attr("class","draggable").attr("id","tmp").attr("data-x",i+o/2).attr("data-y",l+n/2);console.log(u);var f=d3.select("#tmp").node().getBBox(),p=f.x+f.width/2,g=f.y+f.height/2,h=document.getElementById("tmp"),m=(parseFloat(h.getAttribute("data-x"))||0)-p,v=(parseFloat(h.getAttribute("data-y"))||0)-g;h.style.webkitTransform=h.style.transform="translate("+m+"px, "+v+"px)",h.setAttribute("data-x",m),h.setAttribute("data-y",v),$("#tmp").removeAttr("id"),h.setAttribute("data-xCoordEl",e),h.setAttribute("data-yCoordEl",r)}(n,o,a,t,e,r)})}(t,e,r)},dragMove:function(t){var e=$(".selected");if(e.length>0)for(var r=e.length,n=0;n<r;n++){var o=(parseFloat(e[n].getAttribute("data-x"))||0)+t.dx,a=(parseFloat(e[n].getAttribute("data-y"))||0)+t.dy;e[n].style.webkitTransform=e[n].style.transform="translate("+o+"px, "+a+"px)",e[n].setAttribute("data-x",o),e[n].setAttribute("data-y",a)}else t.target&&-1==t.target.getAttribute("class").indexOf("selected")&&($(t.target).addClass("selected"),$(t.target).attr("stroke","red"));$(".elAnchor").remove(),-1==t.target.getAttribute("class").indexOf("dragging")&&$(t.target).addClass("dragging")},toggleSelection:function(t){"mouseup"==t.type&&t.target&&(-1!=t.toElement.getAttribute("class").indexOf("selected")?-1==t.target.getAttribute("class").indexOf("dragend")&&($(t.target).removeClass("selected"),$(t.target).attr("stroke","black")):-1==t.target.getAttribute("class").indexOf("selected")&&($(t.target).addClass("selected"),$(t.target).attr("stroke","red")),-1!=t.target.getAttribute("class").indexOf("dragend")&&$(t.target).removeClass("dragend"))},updateDragEndStates:function(t){$(t.target).removeClass("dragging"),$(t.target).addClass("dragend")},elMouseOver:function(t){$(".elAnchor")[0]&&$("#groupAnchors").remove();var e=parseFloat($(t.target).attr("data-x")),r=parseFloat($(t.target).attr("data-y")),n=t.target.getBBox(),o=(new DOMPoint(t.x,t.y),t.path[1].createSVGPoint());o.x=0,o.y=0;n.x,n.width;var a=n.y+n.height/2;o.y=o.y+a;for(;1!=t.path[0].isPointInStroke(o);)o.x++;var i=d3.select("svg").append("g").attr("id","groupAnchors");i.append("circle").attr("r",4.5).attr("class","elAnchor").attr("id","rightAnchor").attr("fill","red").attr("transform",function(){return"translate("+(e+o.x)+", "+(r+o.y)+")"}),i.append("circle").attr("r",4.5).attr("class","elAnchor").attr("id","leftAnchor").attr("fill","red").attr("transform",function(){return"translate("+(e-o.x)+", "+(r+o.y)+")"}),o.x=0,o.y=0,o.y=o.y+a;for(;1!=t.path[0].isPointInStroke(o);)o.y++;i.append("circle").attr("r",4.5).attr("class","elAnchor").attr("id","bottomAnchor").attr("fill","red").attr("transform",function(){return"translate("+(e+o.x)+", "+(r+o.y)+")"}),o.y=0,o.y=o.y+a;for(;1!=t.path[0].isPointInStroke(o);)o.y--;i.append("circle").attr("r",4.5).attr("class","elAnchor").attr("id","topAnchor").attr("fill","red").attr("point-events","visible").attr("transform",function(){return"translate("+(e+o.x)+", "+(r+o.y)+")"}),$(".elAnchor").on("mousedown mouseup",function(t){var e=$("#object_container").offset();if("mousedown"==t.type&&t.target){$("body").disableTextSelect();var r=interact.getElementRect(event.target);firstAnchorCenter={x:r.left+r.width/2,y:r.top+r.height/2};var n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("id","line1"),n.setAttribute("fill","none"),n.setAttribute("stroke","black"),n.setAttribute("stroke-width","2"),$("svg").append(n),function(){document.onmousemove=function(t){var r,o,a;null==(t=t||window.event).pageX&&null!=t.clientX&&(r=t.target&&t.target.ownerDocument||document,o=r.documentElement,a=r.body,t.pageX=t.clientX+(o&&o.scrollLeft||a&&a.scrollLeft||0)-(o&&o.clientLeft||a&&a.clientLeft||0),t.pageY=t.clientY+(o&&o.scrollTop||a&&a.scrollTop||0)-(o&&o.clientTop||a&&a.clientTop||0));var i=firstAnchorCenter.x-e.left,l=firstAnchorCenter.y-e.top,s=(firstAnchorCenter.x-e.left+t.pageX)/2,c=firstAnchorCenter.y-e.top,d=(firstAnchorCenter.x-e.left+t.pageX)/2,u=t.pageY-e.top,f=t.pageX-e.left,p=t.pageY-e.top;$(n).attr("d","M "+i+","+l+" L "+s+","+c+" "+d+","+u+" "+f+","+p)}}()}if("mouseup"==t.type&&t.target){$("body").enableTextSelect();var o=interact.getElementRect(event.target);secondAnchorCenter={x:o.left+o.width/2,y:o.top+o.height/2};var a=firstAnchorCenter.x-e.left,i=firstAnchorCenter.y-e.top,l=(firstAnchorCenter.x-e.left+(secondAnchorCenter.x-e.left))/2,s=firstAnchorCenter.y-e.top,c=(firstAnchorCenter.x-e.left+(secondAnchorCenter.x-e.left))/2,d=secondAnchorCenter.y-e.top,u=secondAnchorCenter.x-e.left,f=secondAnchorCenter.y-e.top,p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("id","line2"),p.setAttribute("fill","none"),p.setAttribute("stroke","black"),p.setAttribute("stroke-width","2"),p.setAttribute("d","M "+a+","+i+" L "+l+","+s+" "+c+","+d+" "+u+","+f),$("svg").append(p),$("#line1").remove()}else $("body").on("mouseup",function(t){$("#line1").remove()})}),$(".elAnchor").on("click",function(t){console.log("hi")}).on("mouseout",function(t){null!=t.toElement&&(-1!=t.toElement.getAttribute("class").indexOf("dropzone")&&-1!=t.toElement.getAttribute("class").indexOf("elAnchor")||$("#groupAnchors").remove())})},removeAnchor:function(t){null!=t.toElement&&"elAnchor"!=t.toElement.getAttribute("class")&&$("#groupAnchors").remove()}}}]);