const API_KEY = 'aa753056'; //  OMDB API key
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const favoriteMovies = document.getElementById('favoriteMovies');

let timeoutId;

// Function to fetch search results from OMDB API
async function fetchMovies(searchTerm) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
    const data = await response.json();
    return data.Search || [];
}

// Function to display search results
function displayMovies(movies) {
    searchResults.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div>
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;
        // Add favorite button
        const favoriteButton = document.createElement('button');
        favoriteButton.innerText = 'Add to Favorites';
        favoriteButton.addEventListener('click', () => addToFavorites(movie));
        movieElement.appendChild(favoriteButton);

        movieElement.addEventListener('click', () => displayMovieDetails(movie.imdbID));

        searchResults.appendChild(movieElement);
    });
}

// Function to add a movie to favorites
function addToFavorites(movie) {
    const favoriteMovieElement = document.createElement('li');
    favoriteMovieElement.innerHTML = `${movie.Title} (${movie.Year})`;
    favoriteMovies.appendChild(favoriteMovieElement);
}

// Function to display detailed movie information
async function displayMovieDetails(movieId) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
    const movie = await response.json();
    // Display detailed information about the movie
    alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nRated: ${movie.Rated}\nPlot: ${movie.Plot}`);
}

// Function to handle search input
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        if (searchTerm) {
            const movies = await fetchMovies(searchTerm);
            displayMovies(movies);
        }
    }, 500);
}

// Event listener for search input
searchInput.addEventListener('input', handleSearch);
