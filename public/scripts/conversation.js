document.addEventListener("DOMContentLoaded", function () {
  const currentUser = document.querySelector("#current-user").textContent;
  const allMessages = document.querySelectorAll("#convo span");
  for (let i = 0; i < allMessages.length; i++) {
    if (allMessages[i].textContent === currentUser) {
      allMessages[i].parentNode.className = "talker";
    } else {
      allMessages[i].parentNode.className = "talkee";
    }
  }
});
