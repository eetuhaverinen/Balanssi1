// function showLoading() {
//   const loadingOverlay = document.querySelector('.loading-overlay');
//   if (loadingOverlay) {
//     loadingOverlay.style.display = 'flex';
//   }
// }

// function hideLoading() {
//   const loadingOverlay = document.querySelector('.loading-overlay');
//   if (loadingOverlay) {
//     loadingOverlay.style.display = 'none';
//   }
// }

// document.addEventListener('DOMContentLoaded', function() {
//   // Show the loading page only on the login page
//   if (window.location.pathname === '/auth/login') {
//     showLoading();
//   }
// });

// // Attach event listeners to the form elements
// const usernameInput = document.querySelector('input[name="email"]');
// const passwordInput = document.querySelector('input[name="password"]');
// const loginButton = document.querySelector('button[type="submit"]');
// const errorMessage = document.querySelector('.error');

// usernameInput.addEventListener('input', validateInputs);
// passwordInput.addEventListener('input', validateInputs);
// loginButton.addEventListener('click', handleLogin);

// function validateInputs() {
//   if (usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
//     loginButton.classList.add('active');
//   } else {
//     loginButton.classList.remove('active');
//   }
//   errorMessage.textContent = '';
// }

// function handleLogin(event) {
//   event.preventDefault();

//   // Show the loading page
//   showLoading();

//   const email = usernameInput.value.trim();
//   const password = passwordInput.value.trim();

//   fetch('/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   })
//   .then(response => {
//     if (response.ok) {
//       window.location.href = '/etusivu';
//     } else {
//       errorMessage.textContent = 'Incorrect email or password. Please try again.';
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   })
//   .finally(() => {
//     // Hide the loading page after the request is completed
//     hideLoading();
//   });
// }