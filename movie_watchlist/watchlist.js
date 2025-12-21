async function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const movieListEl = document.getElementById('movie-list');

    if (watchlist.length === 0) {
        movieListEl.innerHTML = '<p style="text-align: center; margin-top: 2rem;">Your watchlist is empty</p>';
        return;
    }

    try {
        const movieDetailsPromises = watchlist.map(imdbID => {
            return fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=8fbb449d`)
                .then(res => res.json());
        });

        const movies = await Promise.all(movieDetailsPromises);

        const html = movies.map(movie => `
            <div class="movie-card">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'images/placeholder.png'}"
                     alt="${movie.Title}"
                     onerror="this.src='images/placeholder.png'">
                <div class="movie-details">
                    <div class="movie-card-header">
                        <h4>${movie.Title}</h4>
                        <i class="fa-solid fa-star"></i>
                        <p>${movie.imdbRating}</p>
                    </div>
                    <div class="movie-card-details">
                        <p>${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <button class="remove-watch-list" data-imdb-id="${movie.imdbID}">
                            <i class="fa-solid fa-circle-minus"></i>
                            <p>Remove</p>
                        </button>
                    </div>
                    <p>${movie.Plot}</p>
                </div>
            </div>`).join('');

        movieListEl.innerHTML = html;
    } catch (error) {
        console.log('Error loading watchlist: ', error);
    }
}

document.getElementById('movie-list').addEventListener('click', (e) => {
    const button = e.target.closest('.remove-watch-list');
    if (button) {
        const imdbID = button.dataset.imdbId;
        removeFromWatchList(imdbID);
    }
})

function removeFromWatchList(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    loadWatchlist(); // Reload the watchlist
}

loadWatchlist();