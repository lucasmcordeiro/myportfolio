const navLinks = document.querySelector("#navbar")


navLinks.addEventListener('click', function(e){
    e.preventDefault()
    let ref = 'end'
    console.log(e.target.href.split('#').pop())
    if("projects-container" === e.target.href.split("#").pop()){
       ref = 'start';
       console.log(e.target.href.split('#') )
    }

    if(e.target.classList.contains("navbar-li-a")){
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth', block: "end"})

        
        //scroll(0, 65);.href
    }
    
})

const projects = document.querySelectorAll('.project-tile')
const currentSlide = []


projects.forEach(function(s, i){
    s.style.transform = `translateX(${i*135}%)`
    currentSlide.push(i*130)
})

const buttonLeft = document.querySelector('.slider__btn--left')
const buttonRight = document.querySelector('.slider__btn--right')

const nextSlide = function() {
    if (currentSlide[projects.length-1] > 0 ){
      currentSlide.forEach( (e,i)=> currentSlide[i] -= 135)
      projects.forEach((s, i) => s.style.transform = `translateX(${currentSlide[i]}%)`)

    }
  
  }
  
  const previousSlide = function(){
    if (currentSlide[0] < 0 ){
      currentSlide.forEach( (e,i)=> currentSlide[i] += 135)
      projects.forEach((s, i) => s.style.transform = `translateX(${currentSlide[i]}%)`)

    }
  }

buttonRight.addEventListener('click', nextSlide)
buttonLeft.addEventListener('click', previousSlide)