document.addEventListener("DOMContentLoaded", function () {
    let startIndex = 0;
    const allActivities = document.querySelectorAll('.activity-card')

    refreshCards();

    function refreshCards(){
    for (let i = 0 ; i < allActivities.length; i++){
        const singleActivity = allActivities[i];
        if (i < startIndex + 3 && i >= startIndex){
            singleActivity.classList.remove('hidden')
            singleActivity.classList.add('visible')
        } else {
            singleActivity.classList.remove('visible')
            singleActivity.classList.add('hidden')
        }
    }
    }

    document.querySelector('#button').addEventListener('click', ()=> {
        startIndex = (startIndex +3)% allActivities.length
        refreshCards();
        window.scrollTo(0, 0)
    })

    const matchPercentage = document.querySelectorAll('#match-percentage span')
    for (let i =0; i < matchPercentage.length; i++){
        matchPercentage[i].textContent = 78+(Number(matchPercentage[i].textContent)*4)
    }
})