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
    "Original",
    "Chill",
    "Sports",
    "Creative",
    "Touristic",
    "Food",
    "Walks",
    "Drinks",
    "Open Minded",
    "Craft",
    "Clubbing",
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

        
      } else {
        tagUnique.classList.remove("tag-selected");
        userInterestsArr = userInterestsArr.filter(
          (x) => x != tagUnique.textContent
        );
        console.log(userInterestsArr);
      }
      document.querySelector("#input-tags").value = userInterestsArr;

      let button = document.querySelector("button");
      if (userInterestsArr.length >= 2){

        button.style.backgroundColor = "var(--customprimary)"
      } else {
        button.style.backgroundColor = "#bbbbbb"
      }

    });
  });
});
