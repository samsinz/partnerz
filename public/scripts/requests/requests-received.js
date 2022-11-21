document.addEventListener("DOMContentLoaded", function () {
  const allRequests = document.querySelectorAll(".request-card");

  if (allRequests.length === 0) {
    document.querySelector("#empty-message").style.display = "block";
  }

  const cards = document.querySelectorAll(".request-card");
  const cardId = document.querySelectorAll("#card-id");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      window.location = `requests-received/${cardId[i].textContent}`;
    });
  }
});
