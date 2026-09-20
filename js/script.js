const themeBtn = document.querySelector('.actions-header__theme')
const currentValueLocalStorage = localStorage.getItem('theme')
if (currentValueLocalStorage === 'dark') {
  document.body.classList.add('dark-theme')
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
