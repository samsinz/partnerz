 document.addEventListener("DOMContentLoaded", function () {
    const description = document.querySelector('.description')
    description.textContent = description.textContent.slice(0,50) + '...';
    const matchId = document.querySelector('#hidden-id').textContent


    document.querySelector('#decline').addEventListener("click", () => {
      window.location = `${matchId}/decline`
    })
    document.querySelector('#approve').addEventListener("click", () => {
      window.location = `${matchId}/approve`
    })

  });