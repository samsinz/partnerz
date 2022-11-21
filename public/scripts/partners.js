document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".user-card");
  const cardId = document.querySelectorAll("#card-id");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      window.location = `partners/${cardId[i].textContent}`;
    });
  }

  const bio = document.querySelector("#bio");
  bio.textContent = bio.textContent.slice(0, 50) + "...";
});
