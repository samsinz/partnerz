document.addEventListener("DOMContentLoaded", function () {
  let burgerAnim = document.querySelector("#burger");
  let menu = document.querySelector("ul");
  burgerAnim.addEventListener("click", (event) => {
    event.preventDefault();
    burgerAnim.classList.toggle("open");
    menu.classList.toggle("open");
  });

  document.querySelector("#logo-nav").addEventListener("click", (event) => {
    window.location = "/";
  });
});
