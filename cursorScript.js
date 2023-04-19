
(function() {
    "use strict";

    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      let dot, eventDoc, doc, body, pageX, pageY;
      
      event = event || window.event; // IE-ism
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

      // Add a dot to follow the cursor
      dot = document.createElement('div');
      dot.className = "dot";
      dot.style.left = event.pageX + "px";
      dot.style.top = event.pageY + "px";
      
      document.querySelector('.dot-pos').appendChild(dot);
      let dots = document.querySelectorAll('.dot');
      if (dots.length>6){
        dots[0].remove()
      }
    }
})();




intervalId = window.setInterval(function () {
  let dots = document.querySelectorAll('.dot'); 
  if (dots.length>1){
    dots[0].remove();
  };
}, 12);