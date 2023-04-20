//loginH.js
const errorMessage = document.querySelector('.error-message');

async function handleLogin(event) {
  event.preventDefault();

  // Show the loading page
  showLoading();

  // Get the values of the email and password inputs and send them to the server
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/auth/loginH', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data)

    if (data.token) {
      // Redirect the user to the dashboard page if the login was successful
      window.location.assign('/etusivuH');
    } else {
      // Display an error message if the login was unsuccessful
      errorMessage.textContent = data.error;
    }
  } catch (error) {
    console.log(error);
  } finally {
    // Hide the loading page after the request is completed
    hideLoading();
  }
}
