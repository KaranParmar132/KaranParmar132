(function(){
  const recentlyViewedSliderInterval = setInterval(function(){
    if(window.width >= 768){
      clearInterval(recentlyViewedSliderInterval);
      return;
    }
    this.sliderMobile = document.querySelectorAll(".recently-viewed-grid");
    this.sliderMobile.forEach((sliderElement)=>{
      new Flickity(sliderElement,{
        dots: true,
        cellAlign: 'left',
        watchCSS: true,
        prevNextButtons: false,
        wrapAround: true,
        groupCells: true,
        arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 60, y2: 0,
          x3: 30
        } 
      });
    });
    clearInterval(recentlyViewedSliderInterval);

    function slideHeight(){
      //console.log('height');
      this.slider = document.querySelectorAll(".recently-viewed-grid .grid__item ");        
      this.slider.forEach((slider)=>{      
        slider.classList.add('fit-height');
      });
    }

    setTimeout(function() {
      slideHeight()
    }, 1000);
  
    window.addEventListener('resize', function(event) {
      this.slider = document.querySelectorAll(".recently-viewed-grid .grid__item ");
      this.slider.forEach((slider)=>{      
        slider.classList.remove('fit-height');
      });  
      setTimeout(function() {
        slideHeight()
      }, 500);
    }, true);

  });
})();