
document.addEventListener("DOMContentLoaded", function () {

const partnersButton = document.querySelector("#partners");

console.log(partnersButton)
partnersButton.addEventListener('click', ()=>{
    const activityId = document.querySelector('#activity-id').textContent
    window.location = `${activityId}/partners`
})
})