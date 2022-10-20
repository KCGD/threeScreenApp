window.onload = function() {
    const swipeElement = document.getElementById("swipeElement");
    window["swipeElement"] = new Swipe(swipeElement, {
        startSlide:0,
        draggable:true,
        continuous:false,
        stopPropagation: false,
        callback: function(index, element){},
        transitionEnd: function(index, element){}
    });

    //initialize pages
    InitCalculator();
}