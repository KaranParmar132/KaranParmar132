class SliderComponent extends HTMLElement {
  constructor() {
    super();
    if(this.classList.contains("with-flickity")){
      console.log("Return Please");
      return;
    } 
    this.slider = this.querySelector('[id^="Slider-"]');
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.enableSliderLooping = false;
    this.currentPageElement = this.querySelector('.slider-counter--current');
    this.pageTotalElement = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');
    if(!this.slider) return;
    
    this.sliderFirstItemNode = this.slider.querySelector('.slider__slide');
    this.sliderControlWrapper = this.querySelector('.slider-buttons');    
    this.sliderControlLinksArray = Array.from(this.querySelectorAll('.slider-counter__link'));
    this.sliderControlLinksArray.forEach(link => link.addEventListener('click', this.linkToSlide.bind(this)));
        
            
    if (!this.slider || !this.nextButton) return;

    this.initPages();
    const resizeObserver = new ResizeObserver(entries => this.initPages());
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));        
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));

       
  }

  initPages() {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);    
    if (this.sliderItemsToShow.length < 2) return;
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
    this.slidesPerPage = Math.floor((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
        
    
    this.update();    
    /*console.log("Length:", this.sliderItemsToShow.length);
    console.log("Page:", this.slidesPerPage);*/
    
    
  }

  resetPages() {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.initPages();
  }

  update() {
    const previousPage = this.currentPage;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;    
    //console.log('Current:',this.currentPage);
    /*if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage;
      this.pageTotalElement.textContent = this.totalPages;
    }*/
    
    if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage;
      this.pageTotalElement.textContent = this.totalPages;
    }

    if (this.currentPage != previousPage) {
      this.dispatchEvent(new CustomEvent('slideChanged', { detail: {
        currentPage: this.currentPage,
        currentElement: this.sliderItemsToShow[this.currentPage - 1]        
      }}));    
    }
    
    this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
    //this.prevButton.removeAttribute('disabled');

    if (!this.sliderControlButtons.length) return;

    this.sliderControlButtons.forEach(link => {
      link.classList.remove('slider-counter__link--active');
      link.removeAttribute('aria-current');
    });
    this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
    this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
         
    this.enableSliderLooping = true;
    if (this.enableSliderLooping) return;

    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
      this.prevButton.setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }

  isSlideVisible(element, offset = 0) {
    const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;  
    return (element.offsetLeft + element.clientWidth) <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;  
  }  
  
  onButtonClick(event) {
    event.preventDefault();
    const step = event.currentTarget.dataset.step || this.slidesPerPage;
    this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + (step * this.sliderItemOffset) : this.slider.scrollLeft - (step * this.sliderItemOffset);
            
    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0 && event.currentTarget.name === 'previous') {
      this.slideScrollPosition = this.slider.scrollLeft + this.slider.clientWidth * this.sliderItemsToShow.length;
    } else if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1]) && event.currentTarget.name === 'next') {
      this.slideScrollPosition = 0;
    }      
    
    this.slider.scrollTo({
      left: this.slideScrollPosition
    });
  }
  
  linkToSlide(event) {
    event.preventDefault();
	const slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);        
    
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }
  
}


SlideshowComponent = (function(){

  const selectors = {
    slideshowElement: ".with-flickity",
    nextBtn: ".slider-button[name='next']",
    prevBtn: ".slider-button[name='previous']",    
  }
  function slideHeight(){
    //console.log('height');
    this.slider = document.querySelectorAll(".collection  .with-flickity .slider__slide");        
    this.slider.forEach((slider)=>{      
      slider.classList.add('fit-height');
    });
  }
  function SlideshowComponent(){
    var _this = this;
    this.slideshowElement = document.querySelectorAll(selectors.slideshowElement);    
    this.slideshowElement.forEach((slideshowElement)=>{
      slideshowElement.style.visibility = "hidden";
      _this.init = slideshowElement.querySelector(".flickity-slideshow");      
      _this.autoplay = false;
      _this.effect = false;
      _this.arrows = false;
      _this.dots = false;
      _this.height = false;
      _this.drag = true;
      _this.init.dataset.autoplay == 'true' ? _this.autoplay = _this.init.dataset.speed * 1000 :  _this.autoplay = false;
      _this.init.dataset.effect == 'fade' ? _this.effect = true :  _this.effect = false;
      _this.init.dataset.arrows == 'true' ? _this.arrows = true :  _this.arrows = false;
      _this.init.dataset.dots == 'true' ? _this.dots = true :  _this.dots = false;
      _this.init.dataset.height == 'true' ? _this.height = true :  _this.height = false;
      _this.init.dataset.drag == 'false' ? _this.drag = false :  _this.drag = true;
      _this.slider = new Flickity(slideshowElement.querySelector(".flickity-slideshow"),{
        fade:  _this.effect,
        prevNextButtons: _this.arrows,
        pageDots: _this.dots,
        autoplay: _this.autoplay,
        pauseAutoPlayOnHover: false,
        wrapAround: true,
        groupCells: true,
        adaptiveHeight: _this.height,
        draggable: _this.drag,
        arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 60, y2: 0,
          x3: 30
        }
      });
      
      setTimeout(function(){
        console.log("Hjere.")
        slideshowElement.style.visibility = "visible";
      },1000);
      
    });    
    window.addEventListener('resize', function(event) {
      _this.slider.resize()
    }, true);
  }  
  setTimeout(function() {
    slideHeight()
  }, 1000);

  window.addEventListener('resize', function(event) {
    this.slider = document.querySelectorAll(".collection  .with-flickity .slider__slide");
    this.slider.forEach((slider)=>{      
      slider.classList.remove('fit-height');
    });  
    setTimeout(function() {
      slideHeight()
    }, 500);
  }, true);

  

  return SlideshowComponent;
  
})();


new SlideshowComponent();
customElements.define('slider-component', SliderComponent);