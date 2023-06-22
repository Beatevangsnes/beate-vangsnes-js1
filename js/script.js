const filterButtons = document.querySelectorAll('.filter-button');
let selectedFilter = '';

async function fetchJokes() {
  try {
    let url = 'https://api.noroff.dev/api/v1/jokes';
    
    const response = await fetch(url);
    const data = await response.json();

    const jokesContainer = document.getElementById('jokes-container');

    jokesContainer.innerHTML = '';

    let filteredData = data;
    if (selectedFilter !== '') {
      filteredData = data.filter(joke => joke.type === selectedFilter);
    }

    filteredData.forEach(joke => {
      const { setup, type } = joke;

      const jokeElement = document.createElement('div');
      jokeElement.classList.add('joke');
      jokeElement.innerHTML = `<p><b>Joke:</b> ${setup}</p>
                               <p><b>Type:</b> ${type}</p>
                               <button class="joke-button"><a href="joke.html?id=${joke.id}">View Punchline</a></button>`;

      jokesContainer.appendChild(jokeElement);
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function handleFilterButtonClick(event) {
  const filterButton = event.target;

  filterButtons.forEach(button => {
    button.classList.remove('active');
  });

  filterButton.classList.add('active');

  selectedFilter = filterButton.dataset.filter;

  fetchJokes();
}

filterButtons.forEach(button => {
  button.addEventListener('click', handleFilterButtonClick);
});

document.addEventListener('DOMContentLoaded', fetchJokes);
