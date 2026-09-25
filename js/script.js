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
if (sliderTrack) {
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
}

// CATALOG
let products = []
async function getProducts() {
  const response = await fetch('data/products.json')
  products = await response.json()
  // console.log(products)
  let currentProducts = products.filter((product) => product.category === 'coffee')
  if (window.innerWidth <= 768) {
    currentProducts = currentProducts.slice(0, limitTabs)
  }
  renderCards(currentProducts)
}
getProducts()
const catalogGrid = document.querySelector('.catalog__grid')
const tabs = document.querySelectorAll('.tab-catalog__btn')
const limitTabs = 4
const loadMoreBtn = document.querySelector('.catalog__load-more-btn')

tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    const category = e.currentTarget.dataset.category
    const categoryProducts = products.filter((product) => product.category === category)
    let productsToRender = categoryProducts
    if (window.innerWidth <= 768) {
      productsToRender = categoryProducts.slice(0, limitTabs)
    }
    renderCards(productsToRender)

    if (categoryProducts.length > productsToRender.length) {
      loadMoreBtn.style.display = 'block'
    } else {
      loadMoreBtn.style.display = 'none'
    }

    tabs.forEach((tab) => {
      tab.classList.remove('tab-catalog__btn--active')
    })
    e.currentTarget.classList.add('tab-catalog__btn--active')
  })
})

function renderCards(products) {
  catalogGrid.innerHTML = ''
  products.forEach((product) => {
    const cardHTML = `<article class="catalog__item item-catalog" data-category="${product.category}">
                        <div class="item-catalog__image">
                          <img src="${product.image}" />
                        </div>
                        <div class="item-catalog__body">
                          <a href="#" class="item-catalog__title-link">
                            <h3 class="item-catalog__title">${product.name}</h3>
                          </a>
                          <div class="item-catalog__text">${product.description}</div>
                          <div class="item-catalog__price">$${product.price}</div>
                        </div>
                      </article>`
    catalogGrid.insertAdjacentHTML('beforeend', cardHTML)
  })
}

// LOAD MORE
loadMoreBtn.addEventListener('click', (e) => {
  const activeTab = document.querySelector('.tab-catalog__btn--active')
  const category = activeTab.dataset.category
  const categoryProducts = products.filter((product) => product.category === category)
  renderCards(categoryProducts)
  loadMoreBtn.style.display = 'none'
})
