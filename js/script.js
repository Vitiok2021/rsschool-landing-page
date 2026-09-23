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

const burgerBtn = document.querySelector('.icon-menu')
const body = document.querySelector('body')
const burgerBody = document.querySelector('.menu-header')

const menuLinks = document.querySelectorAll('.menu-header__link, .actions-header__menu')

burgerBtn.addEventListener('click', () => {
  body.classList.toggle('menu-open')
  body.classList.toggle('body-lock')
})

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
