import { hideAll } from "./helper.js";
let url = 'http://localhost:3030/data/movies';
let cardDeck = document.querySelector('.card-deck');
let viewMovieDiv = document.getElementById("movie-example");
cardDeck.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        showDetails(event.target.dataset.id);
    }
})
async function getMovieDetails(id) {
    let response = await fetch(url+`/${id}`)
    let objResponse = await response.json()
    return objResponse
}
async function showDetails(movieId) {
    hideAll();
    viewMovieDiv.replaceChildren()
    let movieDiv = document.createElement('div');
    let movie = await getMovieDetails(movieId)
    movieDiv.classList.add('container')
    movieDiv.innerHTML = `<div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>
    
    <div class="col-md-8">
    <img
    class="img-thumbnail"
    src="${movie.img}"
    alt="Movie"
    />
    </div>
    <div class="col-md-4 text-center">
    <h3 class="my-3">Movie Description</h3>
    <p>
    ${movie.description}
    </p>
          ${loadOptions(movie)}
        </div>
      </div>`
    viewMovieDiv.style.display = 'block'
    console.log(viewMovieDiv.parentElement);
    viewMovieDiv.appendChild(movieDiv);
}

function loadOptions(movie) {
    let userInfo = localStorage.getItem('user');
    let returnElements = '';
    if(JSON.parse(userInfo)._id == movie._ownerId) {
        returnElements += `<a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        <a class="btn btn-primary" href="#">Like</a>
        `
    } else if ( JSON.parse(userInfo)._id) {
        returnElements += `<a class="btn btn-primary" href="#">Like</a>`
    }
    returnElements += `<span class="enrolled-span">Liked 1</span>`
    return returnElements;
}

async function loadMovies() {
    let response = await fetch(url)
    let objResponse = await response.json();
    cardDeck.replaceChildren()
    objResponse.map(movieInfo => createMoviePreview(movieInfo))
}

function createMoviePreview(movieInfo) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card')
    cardDiv.innerHTML = `
    <img class="card-img-top" src="${movieInfo.img}"
         alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movieInfo.title}</h4>
    </div>
    <div class="card-footer">
        <a href="#/details/${movieInfo._id}">
            <button type="button" data-id="${movieInfo._id}" class="btn btn-info">Details</button>
        </a>
    </div>`;
    cardDeck.appendChild(cardDiv);
}

async function openMovie() {

}

export {
    loadMovies,
    openMovie
}