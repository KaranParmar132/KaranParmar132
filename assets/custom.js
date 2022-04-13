window.addEventListener("load", function(){
  var slideIndex = 0;
  showSlides(); // call showslide method   
  function showSlides()
  {
    var i;
    var slides = document.getElementsByClassName("slideshow__slide"); 
    var dots = document.getElementsByClassName("slider__fade");
    var dots_1 = document.getElementsByClassName("slider-counter__link");
    slideIndex++; 
    if (slideIndex > slides.length) 
    {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.
      replace(" active", "");
    }
    for (i = 0; i < dots_1.length; i++) {
      dots_1[i].className = dots_1[i].className.
      replace(" slider-counter__link--active", "");
    }
    dots[slideIndex - 1].className += " active";
    dots_1[slideIndex - 1].className += " slider-counter__link--active";
    setTimeout(showSlides, 5000); 
  }
});