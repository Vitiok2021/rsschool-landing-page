const themeBtn = document.querySelector('.actions-header__theme')
const currentValueLocalStorage = localStorage.getItem('theme')
if (currentValueLocalStorage === 'dark') {
  document.body.classList.add('dark-theme')
} else {
  document.body.classList.remove('dark-theme')
}
themeBtn.addEventListener('click', toggleTheme)
function toggleTheme() {
  document.body.classList.toggle('dark-theme')
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
}
// Burger
const burgerBtn = document.querySelector('.icon-menu')
const body = document.querySelector('body')
const burgerBody = document.querySelector('.menu-header')
burgerBtn.addEventListener('click', () => {
  body.classList.toggle('menu-open')
  body.classList.toggle('body-lock')
})

const menuLinks = document.querySelectorAll('.menu-header__link, .actions-header__menu')
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open')
    body.classList.remove('body-lock')
  })
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    body.classList.remove('menu-open')
    body.classList.remove('body-lock')
  }
})
// Slider
const prevBtn = document.querySelector('.slider__btn-prev')
const nextBtn = document.querySelector('.slider__btn-next')
const sliderTrack = document.querySelector('.slider__track')
const sliderItem = document.querySelectorAll('.slider__item')
const sliderDot = document.querySelectorAll('.slider__dot')
let currentIndex = 0
function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`
  sliderDot.forEach((dot) => {
    dot.classList.remove('slider__dot--active')
  })
  sliderDot[currentIndex].classList.add('slider__dot--active')
}
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex--
    if (currentIndex < 0) {
      currentIndex = sliderItem.length - 1
    }
    updateSlider()
  })
}
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex++
    if (currentIndex === sliderItem.length) {
      currentIndex = 0
    }
    updateSlider()
  })
}
let startX = 0
let endX = 0
sliderTrack.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX
  console.log(startX)
})
sliderTrack.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX
  console.log(endX)
})
sliderTrack.addEventListener('touchend', (e) => {
  const diff = startX - endX
  if (diff > 50) {
    currentIndex++
    if (currentIndex === sliderItem.length) {
      currentIndex = 0
    }
    updateSlider()
  }
  if (diff < -50) {
    currentIndex--
    if (currentIndex < 0) {
      currentIndex = sliderItem.length - 1
    }
    updateSlider()
  }
})
