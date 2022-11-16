
document.addEventListener("DOMContentLoaded", function () {

const partnersButton = document.querySelector("#partners");

console.log(partnersButton)
partnersButton.addEventListener('click', ()=>{
    console.log('hello')
    window.location = 'activities/partners'
})
})