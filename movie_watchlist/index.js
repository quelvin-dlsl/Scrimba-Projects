// My API key:  8fbb449d

document.getElementById('search-movie').addEventListener('submit', async(e) => {
    e.preventDefault();

    const searchTerm = document.querySelector('#input-movie').value;

    try {
        const searchRes = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=8fbb449d`)
        const searchData = await searchRes.json()

        if(!searchData.Search){
            document.getElementById('movie-list').innerHTML = '<p class="no-movie">No movies found</p>'
            return
        }

        const movieDetailsPromises = searchData.Search.map(movie => {
            return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8fbb449d`)
                .then(res => res.json())
        })

        const movies = await Promise.all(movieDetailsPromises)

        const html = movies.map(movie => `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="movie-details">
                    <div class="movie-card-header">
                        <h4>${movie.Title}</h4>
                        <i class="fa-solid fa-star"></i>
                        <p>${movie.imdbRating}</p>
                    </div>
                    <div class="movie-card-details">
                        <p>${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <button data-imdb-id="${movie.imdbID}"  class="add-watch-list">
                            <i class="fa-solid fa-circle-plus"></i>
                            <p>Watchlist</p>
                        </button>
                    </div>
                    <p>${movie.Plot}</p>
                </div>
            </div>`).join('')

        document.getElementById('movie-list').innerHTML = html
    } catch (error) {
        console.log('Error fetching movies: ', error)
    }
})

document.getElementById('movie-list').addEventListener('click', (e) => {
    const button = e.target.closest('.add-watch-list');
    if (button) {
        const imdbID = button.dataset.imdbId;
        addToWatchList(imdbID);
    }
})

function addToWatchList(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie added to watchlist!');
    } else {
        alert('Movie already in watchlist!');
    }
}