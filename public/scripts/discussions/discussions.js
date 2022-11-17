document.addEventListener("DOMContentLoaded", function () {

const idMessage = document.querySelectorAll('#id');
const conversation = document.querySelectorAll('.conversation');
const conv = document.querySelectorAll('#conv');



for(let i = 0; i < conversation.length; i++){

    conv[i].textContent = conv[i].textContent.slice(0,70) + '...';

    conversation[i].addEventListener('click',()=>{
       
        window.location=`/discussions/${idMessage[i].textContent}`
       
})
}

});