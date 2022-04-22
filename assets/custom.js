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

// function openMag(prod_id, findex) {
//   /*Size is  set in pixels... supports being written as: '250px' */
//   var magnifierSize = 200;

//   /*How many times magnification of image on page.*/
//   var magnification = 2;

//   function magnifier() {

//     this.magnifyImg = function(ptr, magnification, magnifierSize) {
//       var $pointer;
//       if (typeof ptr == "string") {
//         $pointer = $(ptr);
//       } else if (typeof ptr == "object") {
//         $pointer = ptr;
//       }

//       if (!($pointer.is('img'))) {
//         alert('Object must be image.');
//         return false;
//       }

//       magnification = +(magnification);

//       $pointer.hover(function() {
//         $(this).css('cursor', 'none');
//         $('.magnify').show();

//         //Setting some variables for later use
//         var width = $(this).width();
//         var height = $(this).height();
//         var src = $(this).attr('src');
//         var imagePos = $(this).offset();
//         var image = $(this);

//         if (magnifierSize == undefined) {
//           magnifierSize = '150px';
//         }

//         $('.magnify').css({
//           'background-size': width * magnification + 'px ' + height * magnification + "px",
//           'background-image': 'url("' + src + '")',
//           'width': magnifierSize,
//           'height': magnifierSize
//         });

//         //Setting a few more...
//         var magnifyOffset = +($('.magnify').width() / 2);
//         var rightSide = +(imagePos.left + $(this).width());
//         var bottomSide = +(imagePos.top + $(this).height());

//         $(document).mousemove(function(e) {
//           if (e.pageX < +(imagePos.left - magnifyOffset / 6) || e.pageX > +(rightSide + magnifyOffset / 6) || e.pageY < +(imagePos.top - magnifyOffset / 6) || e.pageY > +(bottomSide + magnifyOffset / 6)) {
//             $('.magnify').hide();
//             $(document).unbind('mousemove');
//           }
//           var backgroundPos = "" - ((e.pageX - imagePos.left) * magnification - magnifyOffset) + "px " + -((e.pageY - imagePos.top) * magnification - magnifyOffset) + "px";
//           $('.magnify').css({
//             'left': e.pageX - magnifyOffset,
//             'top': e.pageY - magnifyOffset,
//             'background-position': backgroundPos,
//             'background-repeat': "no-repeat",
//             'border': "6px solid #fff"
//           });
//         });
//       }, function() {

//       });
//     };
//     this.init = function() {
//       $('body').prepend('<div class="magnify"></div>');
//     }
//     return this.init();
//   }

//   var magnify = new magnifier();
//   var magid = "#mag-" + prod_id + "_" + findex;
//   magnify.magnifyImg(magid, magnification, magnifierSize);
// }