/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  // Loop through all the sections
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute('id')

    // Check if the section is currently visible
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Find the corresponding navigation item using the section ID
      const navItem = document.querySelector('.nav__item.' + sectionId)

      // Remove the active-link class from all the navigation items
      document.querySelectorAll('.nav__item').forEach(item => {
        item.classList.remove('active-link')
      })

      // Add the active-link class to the current navigation item
      navItem.classList.add('active-link')
    }
  })
}

// Add event listener for click event on navigation links
document.querySelectorAll('.nav__menu a').forEach(link => {
  link.addEventListener('click', function() {
    // Remove active-link class from all navigation links
    document.querySelectorAll('.nav__menu a').forEach(link => {
      link.classList.remove('active-link')
    })

    // Add active-link class to the clicked navigation link
    this.parentElement.classList.add('active-link')
  })
})

window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header')
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) {
    header.classList.add('scroll-header')
  } else {
    header.classList.remove('scroll-header')
  }
}
window.addEventListener('scroll', scrollHeader)

const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav__link');
const menuLength = menuItem.length;
for (let i = 0; i < menuLength; i++) {
  if (menuItem[i].href === currentLocation) {
    menuItem[i].classList.add("active-link");
  }
}


