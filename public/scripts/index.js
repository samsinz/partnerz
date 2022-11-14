document.addEventListener("DOMContentLoaded", function () {
  let burgerAnim = document.querySelector("#burger");
  burgerAnim.addEventListener("click", (event) => {
    burgerAnim.classList.toggle("open");
  });
});
