'use strict';

// const profileForm = document.getElementById("profileForm");
// const submitButton = document.getElementById("submitButton");

// submitButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   const formData = new FormData(profileForm);
//   const loader = document.getElementById("loader");

//   // Näytä loader-animaatio
//   loader.style.display = "block";

//   fetch("/profiili", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         // Piilota loader-animaatio
//         loader.style.display = "none";
//         // Näytä "Tiedot päivitetty" -viesti
//         const message = document.getElementById("message");
//         message.style.display = "block";
//         setTimeout(() => {
//           message.style.display = "none";
//         }, 3000); // Piilota viesti 3 sekunnin kuluttua
//       } else {
//         // Piilota loader-animaatio
//         loader.style.display = "none";
//         alert("Päivitys epäonnistui!");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Päivitys epäonnistui!");
//     });
// });
// const API_URL = 'http://localhost:4000/api'; // change url when uploading to server

// const signupForm = document.querySelector('#signup-form');

// // login
// signupForm.addEventListener('submit', async (evt) => {
//   evt.preventDefault();
//   const data = serializeJson(signupForm);
//   console.log(JSON.stringify(data));

//   const fetchOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(API_URL + '/user/signup', fetchOptions);

//   const json = await response.json();
//   console.log('login response', json);
//   if (!json.email) {
//     alert(json.message);
//   } else {
//     // save token
//     sessionStorage.setItem('token', json.token);
//     sessionStorage.setItem('email', json.email);
//     location.href = 'front.html';
//   }
// });