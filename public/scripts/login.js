document.addEventListener("DOMContentLoaded", function () {
    
    const next = document.querySelector('#next')
    const validateLogIn = document.querySelector('#validate-log-in')
    next.addEventListener('click', () => {
        validateLogIn.click()
    })
    
})