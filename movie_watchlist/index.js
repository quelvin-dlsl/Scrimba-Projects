// My API key:  8fbb449d
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

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
                <h4>${movie.Title}</h4>
                <h3>${movie.Year}</h3>
            </div>`).join('')

        document.getElementById('movie-list').innerHTML = html
    } catch (error) {
        console.log('Error fetching movies: ', error)
    }
})