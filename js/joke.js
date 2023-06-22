async function fetchJokePunchline() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const jokeId = urlParams.get('id');
    const response = await fetch(`https://api.noroff.dev/api/v1/jokes/${jokeId}`);
    const joke = await response.json();
    const jokeTypeElement = document.getElementById('joke-type');
    const jokeSetupElement = document.getElementById('joke-setup');
    const jokePunchlineElement = document.getElementById('joke-punchline');
    const revealButton = document.getElementById('reveal-button');

    jokeTypeElement.innerHTML = `<b>Type:</b> ${joke.type}`;
    jokeSetupElement.innerHTML = `<b>Joke:</b> ${joke.setup}`;
    jokePunchlineElement.style.display = 'none';

    revealButton.addEventListener('click', async () => {
      if (jokePunchlineElement.style.display === 'none') {
        jokePunchlineElement.textContent = joke.punchline;
        jokePunchlineElement.style.display = 'block';
        revealButton.style.display = 'none';
      }
    });
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchJokePunchline);
