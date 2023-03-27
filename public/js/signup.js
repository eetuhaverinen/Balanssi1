'use strict';
const API_URL = 'http://localhost:4000/api'; // change url when uploading to server

const signupForm = document.querySelector('#signup-form');

// login
signupForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(signupForm);
  console.log(JSON.stringify(data));

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(API_URL + '/user/signup', fetchOptions);

  const json = await response.json();
  console.log('login response', json);
  if (!json.email) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('email', json.email);
    location.href = 'front.html';
  }
});