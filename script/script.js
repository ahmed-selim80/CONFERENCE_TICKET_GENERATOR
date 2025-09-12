"use strict";

const mainPage = document.querySelector(".main-page");
const ticketPage = document.querySelector(".ticket-main")
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
let userData;


// Doing the upload input logic
function previewFile(file) {
  if (!file) return;

  const imageURL = URL.createObjectURL(file);

  // show the name
  uploadArea.textContent = file.name;

  // show the selected image as the background
  uploadArea.style.backgroundImage = `url(${imageURL})`;
  uploadArea.style.backgroundPosition = "center";
  uploadArea.style.backgroundRepeat = "no-repeat";
  uploadArea.style.backgroundSize = "cover"; // fills area nicely
}

// Showing the selected file 
fileInput.addEventListener("change", function (e) {
    e.preventDefault();
    if (fileInput.files.length > 0) {
        previewFile(fileInput.files[0]);
    }
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
uploadArea.addEventListener("drop", function (e) {
  e.preventDefault();

  if (e.dataTransfer.files.length > 0) {
    fileInput.files = e.dataTransfer.files; // sync with input
    previewFile(fileInput.files[0]);
  }
});



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
    // showing the success message
    errorMsg.style.opacity = 0;
    successMsg.style.opacity = 1;
    
    
    setTimeout(function(){
        // making the message disappear after 1 second
        successMsg.style.opacity = 0;

        // making the main page disappear
        mainPage.classList.add("hidden")

        // showing the ticket with this user's info
        ticketPage.innerHTML = `
             <span> <img width="25px" src="assets/images/logo-mark.svg" alt="logo"> Coding Conf</span>

            <h1>congrats, ${userData.name}! <br>Your ticket is ready.</h1>
            <p>we've emailed your ticket to<br>
                ${userData.email} and will send updates in<br>
                the run up to the event.
            </p>
            <div class="ticket-div">
                <!-- <img src="assets/images/pattern-ticket.svg" alt="ticket"> -->
                <div class="ticket-header">
                    <img src="assets/images/logo-full.svg" alt="">
                    <p>31jul / 3035</p>
                </div>
                <div class="ticket-info">
                    <img src="assets/images/image-avatar.jpg" alt="Personal Photo">
                    <section class="ticket-info-text">
                    <p>ahmed selim</p>
                    <span><img style="margin-right: 3px;" src="assets/images/icon-github.svg" alt=""> @fakehanzo</span>
                    </section>
                </div>

                <p class="ticket-id">#4234f</p>
            
            </div><!-- ticket-div -->
            <img class="line-top" src="assets/images/pattern-squiggly-line-top.svg" alt="">
            <img class="line-bottom" src="assets/images/pattern-squiggly-line-bottom-desktop.svg" alt="">
        `
        ticketPage.classList.remove("hidden");

    } , 1000)
    
    // saving the user's data
    userData = {
        name : fullName.value,
        imageURL : fileInput.value,
        email : email.value,
        github : github.value,
    };

    
    console.log(userData)
  } else {
    errorMsg.style.opacity = 1;
    successMsg.style.opacity = 0;
  }
});