document.addEventListener("DOMContentLoaded", function () {
const description = document.querySelector('#description')
    description.textContent = description.textContent.slice(0,120) + '...';
})
  