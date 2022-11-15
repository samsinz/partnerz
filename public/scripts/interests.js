document.addEventListener("DOMContentLoaded", function () {
  let activities = [
    "Museum",
    "Indoors",
    "Outdoors",
    "Bar",
    "Fancy",
    "Adventure",
    "Culture",
    "Art",
    "Show",
    "Romantic",
    "Landscape",
    "Secret Place",
    "Free",
    "Cheap",
    "Cocktails",
    "Music",
    "Cosy",
    "Ambiance",
    "Exotic",
    "Clubbing",
    "Original",
    "Chill",
    "Sports",
    "Creative",
    "Touristic",
    "Food",
    "Walks",
    "Drinks",
    "Craft",
    "Open Minded",
    "Intellectual",
  ];

  let userInterestsArr = [];

  let tags = document.querySelector("#tags");

  activities.forEach((activity) => {
    const tagUnique = document.createElement("div");
    tagUnique.classList.add("tag");

    const newTag = document.createElement("p");
    newTag.classList.add("tag-activity");
    newTag.textContent = activity;

    tagUnique.append(newTag);
    tags.append(tagUnique);

    tagUnique.addEventListener("click", () => {
      tagUnique.classList.toggle("tag-selected");

      if (
        tagUnique.classList.contains("tag-selected") &&
        userInterestsArr.length < 5
      ) {
        userInterestsArr.push(tagUnique.textContent);
        console.log(userInterestsArr);

        let button = document.querySelector("button");
        button.addEventListener("click", () => {
          window.location = "/activities/activities";
        });
      } else {
        tagUnique.classList.remove("tag-selected");
        userInterestsArr = userInterestsArr.filter(
          (x) => x != tagUnique.textContent
        );
        console.log(userInterestsArr);
      }
    });
  });
});
