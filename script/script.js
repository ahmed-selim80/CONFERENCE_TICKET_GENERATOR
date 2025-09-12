"use strict";

// Doing the upload input logic
const fileInput = document.getElementById("upload");
const uploadArea = document.querySelector(".upload");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const github = document.querySelector("#github");
const btn = document.querySelector("button");
let errorMsg = document.querySelector(".error-msg");
let successMsg = document.querySelector(".success-msg");
let form = document.querySelector("form");
let validForm = true;

// Showing the selected file 
fileInput.addEventListener("change", () => {
  if(fileInput.files[0].name)
    uploadArea.textContent = fileInput.files[0].name;
  else
    uploadArea.textContent = "File Not Found ❌";
});


// Changing color when hovering over the upload area
uploadArea.addEventListener("dragenter" , function(e){
    e.preventDefault();
    uploadArea.style.backgroundColor = "rgba(255, 255, 255, 0.142)";
})

// Changing color to normal when exiting the upload area
uploadArea.addEventListener("dragleave" , function(e){
    e.preventDefault();
    uploadArea.style.backgroundColor = "#ffffff14";
})

// Dragging the file to the field
uploadArea.addEventListener("dragover" , function(e){
    // must do this to enable drop
    e.preventDefault();
})

// dropping the actual file into the upload area
uploadArea.addEventListener("drop" , function(e){
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
    fileInput.files = e.dataTransfer.files;
    uploadArea.textContent = e.dataTransfer.files[0].name;
    console.log(e.dataTransfer.files[0])
  }
})



// Reusable validators
function validateFile() {
  if (fileInput.files.length === 0 || fileInput.files[0].size > 500000) {
    uploadArea.style.border = "1px solid red";
    return false;
  }
  uploadArea.style.border = "1px solid green";
  return true;
}

function validateName() {
  if (fullName.value.trim() === "") {
    fullName.style.border = "1px solid red";
    return false;
  }
  fullName.style.border = "1px solid green";
  return true;
}

function validateEmail() {
  if (!email.value.includes("@") || !email.value.endsWith(".com")) {
    email.style.border = "1px solid red";
    return false;
  }
  email.style.border = "1px solid green";
  return true;
}

function validateGithub() {
  if (!github.value.startsWith("@") || github.value.trim() === "") {
    github.style.border = "1px solid red";
    return false;
  }
  github.style.border = "1px solid green";
  return true;
}

// 👉 Field-level validation (on blur)
fileInput.addEventListener("change", validateFile);
fullName.addEventListener("blur", validateName);
email.addEventListener("blur", validateEmail);
github.addEventListener("blur", validateGithub);

// 👉 Final validation (on submit)
btn.addEventListener("click", function (e) {
  e.preventDefault();

  const isValid =
    validateFile() && validateName() && validateEmail() && validateGithub();

  if (isValid) {
    errorMsg.style.opacity = 0;
    successMsg.style.opacity = 1;
  } else {
    errorMsg.style.opacity = 1;
    successMsg.style.opacity = 0;
  }
});