async function handleLogin(event) {
    event.preventDefault();
  
    // Show the loading page
    showLoading();
  
    // Send a POST request to the server with any email and password values
    try {
      const response = await fetch('/auth/loginHoitaja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'test@example.com', password: 'password' })
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Redirect the user to the dashboard page if the login was successful
        window.location.assign('/etusivuH');
      } else {
        // Display an error message if the login was unsuccessful
        errorMessage.textContent = data.message;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Hide the loading page after the request is completed
      hideLoading();
    }
  }
  