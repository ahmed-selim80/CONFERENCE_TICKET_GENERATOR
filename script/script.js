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



btn.addEventListener("click" , function(e){
    e.preventDefault();

    
    // if file size is too big
    if(fileInput.files[0]?.size > 500000 || fileInput.files.length == 0){
        uploadArea.style.border = "1px solid red";
        errorMsg.style.opacity = 1;
        validForm = false;
    }
    else{
        uploadArea.style.border = "1px solid green";
        validForm = true;
    }
    
    // if no name entered
    if(fullName.value == ""){
        fullName.style.border = "1px solid red";
        errorMsg.style.opacity = 1;
        validForm = false;
    }
    else{
        fullName.style.border = "1px solid green";
        validForm = true;
    }

    // if email is not formatted correctly
    if(!email.value.includes("@") || !email.value.endsWith(".com") || email.value == ""){
        email.style.border = "1px solid red";
        errorMsg.style.opacity = 1;
        validForm = false;
    }
    else{
        email.style.border = "1px solid green";
        validForm = true;
    }

    // if github username isn't correct
    if(!github.value.startsWith("@") || github.value == ""){
        github.style.border = "1px solid red";
        errorMsg.style.opacity = 1;
        validForm = false;
    }
    else{
        github.style.border = "1px solid green";
        validForm = true;
    }

    if(validForm){
        errorMsg.style.opacity = 0;
        successMsg.style.opacity = 1;
    }


})