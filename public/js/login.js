const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');
const loginButton = document.querySelector('button[type="submit"]');
const errorMessage = document.querySelector('.error-message');

// Attach event listeners to the form elements
usernameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
loginButton.addEventListener('click', handleLogin);

// Define the functions that you need
function validateInputs() {
  // Check if the username and password inputs are not empty
  if (usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
    loginButton.classList.add('active');
  } else {
    loginButton.classList.remove('active');
  }
  // Clear the error message when the user starts typing again
  errorMessage.textContent = '';
}

function handleLogin(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Show the loading page
  showLoading();

  // Get the values of the username and password inputs and send them to the server
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  // Use fetch or XMLHttpRequest to send an AJAX request to the server
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      // Redirect the user to the dashboard page if the login was successful
      window.location.href = '/loader';
    } else {
      // Display an error message if the login was unsuccessful
      errorMessage.textContent = 'Incorrect username or password. Please try again.';
    }
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    // Hide the loading page after the request is completed
    hideLoading();
  });
}
