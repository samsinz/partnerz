 document.addEventListener("DOMContentLoaded", function () {
    const description = document.querySelector('.description')
    description.textContent = description.textContent.slice(0,50) + '...';
    const matchId = document.querySelector('#hidden-id').textContent

    console.log('hihi')

    document.querySelector('#decline').addEventListener("click", () => {
      console.log('decline')
      window.location = `${matchId}/decline`
    })
    document.querySelector('#approve').addEventListener("click", () => {
      console.log('approve')
      window.location = `${matchId}/approve`
    })

  });