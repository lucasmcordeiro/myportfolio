'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((el) => {
  el.addEventListener('click', openModal);
})
  

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const header = document.querySelector('.header');
const section = document.querySelectorAll('.section');


const allButtons = document.getElementsByTagName('button');



const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
//header.append(message.cloneNode(true))
//header.before(message)
//header.after(message)
document.querySelector('.btn--close-cookie').addEventListener('click', e => message.remove());
message.style.backgroundColor = '#37383d';
message.style.width = '120%';


message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');


//Non-standart

logo.setAttribute('company', 'Bankist');



const link = document.querySelector('.twitter-link');


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
/*   const coord1 = section1.getBoundingClientRect();
  console.log(coord1);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth); */

/*   window.scrollTo({left : coord1.left + window.pageXOffset, 
                   top : coord1.top + window.pageYOffset,
                  behavior : 'smooth'}); */
  
  section1.scrollIntoView({behavior: 'smooth'});
});


const h1 = document.querySelector('h1');

const alertH1 = (e) => {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1)
};

h1.addEventListener('mouseenter', alertH1);

/* h1.onmouseenter = (e) => alert('addEventListener: Great! You are reading the heading :D'); */


/* const randomInt = (min,max) => Math.floor(Math.random() * ((max - min + 1) + min));
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(55, 200)}, ${randomInt(110, 145)})`;
console.log(randomColor())

document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget)
}) 


document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget)
}) 

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget)
})  */

/* document.querySelectorAll('.nav__link').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault()
        const id = this.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})

        console.log("Hi!!!!")})
    }) */

    document.querySelector('.nav__links').addEventListener('click', function(e) {
      e.preventDefault()

      if(e.target.classList.contains('nav__link')){
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'})
      }
    })  




const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer =document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  if(clicked.classList.contains('operations__tab')){

      tabs.forEach(t => t.classList.remove('operations__tab--active'))
      clicked.classList.add('operations__tab--active')

      tabsContent.forEach(function(t) {
        
        if(t.classList.contains('operations__content--'+clicked.getAttribute('data-tab'))){
          t.classList.add('operations__content--active')
        } else {
          t.classList.remove('operations__content--active')
        }
      })


    }

})

// menu fade animation
const handleOver = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if(el !== link){
          el.style.opacity = this;
      }

      logo.style.opacity = this;
    })

  }

}
nav.addEventListener('mouseover', handleOver.bind(0.5))


nav.addEventListener('mouseout', handleOver.bind(1))
//


/* const initialCords = section1.getBoundingClientRect();


window.addEventListener('scroll', function(){
  if(window.scrollY > initialCords.top){
    nav.classList.add('sticky');
  }else {
    nav.classList.remove('sticky');
  }
}) */

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')

}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//Reveal sections 
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer){
  const [entry] = entries;


  if(entry.isIntersecting) entry.target.classList.remove("section--hidden")
  else entry.target.classList.add("section--hidden") 
}


const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold:0.15

})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})



const imgTargets = document.querySelectorAll('img[data-src]')
const loadImg = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root:null,
  threshold:0,
  rootMargin:'200px'
})

console.log(1, imgTargets)
imgTargets.forEach(img => imgObserver.observe(img));
imgTargets.forEach(img => console.log(1, img));


//slide

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')

const buttonLeft = document.querySelector('.slider__btn--left')
const buttonRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')
const currentSlide = [0, 100, 200]

slider.style.transform = 'scale(0.9)'
slider.style.overflow = 'visible'


const nextSlide = function() {
  if (currentSlide[2] > 0 ){
    currentSlide.forEach( (e,i)=> currentSlide[i] -= 100)
    slides.forEach((s, i) => s.style.transform = `translateX(${currentSlide[i]}%)`)
    activateDots(currentSlide.indexOf(0))
  }

}

const previousSlide = function(){
  if (currentSlide[0] < 0 ){
    currentSlide.forEach( (e,i)=> currentSlide[i] += 100)
    slides.forEach((s, i) => s.style.transform = `translateX(${currentSlide[i]}%)`)
    activateDots(currentSlide.indexOf(0))
  }
}

buttonRight.addEventListener('click', nextSlide)
buttonLeft.addEventListener('click', previousSlide)

document.addEventListener('keydown', function(e){
  if(e.key == 'ArrowLeft') previousSlide()
  
  else if(e.key == 'ArrowRight') nextSlide()
})

const createDots = function() {
  slides.forEach(function(e, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

createDots()
const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;

    currentSlide.forEach( (e,i)=> currentSlide[i] = 100 * (i - slide))
    slides.forEach((s, i) => s.style.transform = `translateX(${currentSlide[i]}%)`)
    console.log(e.target.dataset)
    activateDots(e.target.dataset['slide'])
  }
})


slides.forEach(function(s, i) { 
  s.style.transform = `translateX(${currentSlide[i]}%)`;
  
  activateDots(0)
}
  )

  document.addEventListener('DOMContentLoaded', function(e){
    console.log('HTML parsed and DOM tree built!', e)
  })

  window.addEventListener('load', function(e){
    console.log('Page fully loaded!', e)
  })

 /*  window.addEventListener('beforeunload', function(e){
    e.preventDefault();
    console.log(e);
    e.returnValue =  "";
  }) */