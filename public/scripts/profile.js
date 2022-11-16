const updateImage = document.querySelector(".updateImage");
const file = document.querySelector("#profilePicture");
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


const deleteButton = document.querySelector('.delete')
const id = document.querySelector('#id').textContent;
console.log(id)


deleteButton.addEventListener('click', ()=> {
  console.log(id)
  window.location =`/profile/delete/${id}`
})

