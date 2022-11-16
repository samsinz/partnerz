document.addEventListener("DOMContentLoaded", function () {
    const uploadImage = document.querySelector("#upload-image");
    const file = document.querySelector("#profilePicture");
    uploadImage.addEventListener("click", () => {
      file.click();
    });

    const next = document.querySelector('#next')
    const validateSignUp = document.querySelector('#validate-sign-up')
    next.addEventListener('click', () => {
        const password1 = document.querySelector('#password').value
        const password2 = document.querySelector('#password2').value
        if (password1!=password2){
          document.querySelector('#match-error').style.display = 'block'
        } else{
          validateSignUp.click()
        }
    })

    const profilePic = document.querySelector('#profile-pic')

    file.onchange = evt => {
        const [imgFile] = file.files
        if (imgFile) {
            profilePic.style.background = `center / contain no-repeat url(${URL.createObjectURL(imgFile)})`;
            profilePic.style.display = 'block'
            uploadImage.textContent = 'Uploaded'
            document.querySelector('#image-handler').style.flexDirection = 'row'
        }
      }
})