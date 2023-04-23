const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const recipient = document.getElementById('recipient').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const attachment = document.getElementById('attachment').files[0];

  const formData = new FormData();
  formData.append('recipient', recipient);
  formData.append('subject', subject);
  formData.append('message', message);

  if (attachment) {
    formData.append('attachment', attachment);
  }

  try {
    const response = await fetch('/viestit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('Message sent');
      messageForm.reset();
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert('Failed to send message');
  }
});
