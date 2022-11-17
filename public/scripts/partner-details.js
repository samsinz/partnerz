
document.addEventListener("DOMContentLoaded", function () {

    const partnersButton = document.querySelector("#partners");
    
    partnersButton.addEventListener('click', ()=>{
        const partnerId = document.querySelector('#partner-id').textContent

        window.location = `${partnerId}/request`
    })
    })