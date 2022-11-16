const updateImage = document.querySelector(".updateImage");
const file = document.querySelector("#profilePicture");
const deleate = document.querySelector(".deleate");
const image = document.querySelector('#image');
const edit = document.querySelector('#edit');
updateImage.addEventListener("click", () => {
  file.click();
});

file.onchange = evt => {
  const [imgFile] = file.files
  if (imgFile) {
    image.src = URL.createObjectURL(imgFile)
  }
}

edit.addEventListener('click',()=>{
  window.location.assign('/interests')
})