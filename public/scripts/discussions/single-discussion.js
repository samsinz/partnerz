document.addEventListener("DOMContentLoaded", function () {
  const currentUser = document.querySelector("#current-user").textContent;
  const allMessages = document.querySelectorAll("#convo p");
  const senderIds = document.querySelectorAll("#sender-id");
  for (let i = 0; i < allMessages.length; i++) {
    if (senderIds[i].textContent === currentUser) {
      allMessages[i].className = "talker";
    } else {
      allMessages[i].className = "talkee";
    }
  }
  window.scrollTo(0, document.body.scrollHeight + 1000);
});
