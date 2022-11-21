document.addEventListener("DOMContentLoaded", function () {
  const price = document.querySelector("#price").textContent;
  const light = document.querySelector("#light-span");
  const bold = document.querySelector("#bold-span");

  if (price === "0") {
    light.textContent = "Free";
  } else if (price === "1") {
    bold.textContent = "€";
    light.textContent = "€€€";
  } else if (price === "2") {
    bold.textContent = "€€";
    light.textContent = "€€";
  } else if (price === "3") {
    bold.textContent = "€€€";
    light.textContent = "€";
  } else {
    bold.textContent = "€€€€";
  }

  const partnersButton = document.querySelector("#partners");

  partnersButton.addEventListener("click", () => {
    const activityId = document.querySelector("#activity-id").textContent;
    window.location = `${activityId}/partners`;
  });
});
