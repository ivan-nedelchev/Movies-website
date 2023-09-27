import { hideAll } from "./helper.js";
import { loadHome } from "./home.js";
import { editMovie } from "./edit.js";
let url = 'http://localhost:3030/data/movies';
let cardDeck = document.querySelector('.card-deck');
let viewMovieDiv = document.getElementById("movie-example");
cardDeck.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        showDetails(event.target.dataset.id);
    }
})
async function getMovieDetails(id) {
    let response = await fetch(url + `/${id}`)
    let objResponse = await response.json()
    return objResponse
}
async function showDetails(movieId) {
    hideAll();
    viewMovieDiv.replaceChildren()
    let userInfo = localStorage.getItem('user');
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
          ${await loadOptions(movie, userInfo)}
        </div>
      </div>`
    viewMovieDiv.style.display = 'block'
    viewMovieDiv.appendChild(movieDiv);
    movieDiv.querySelector('.col-md-4.text-center').addEventListener('click', (event) => {
        event.preventDefault()
        if(event.target.tagName == "A") {
            event.preventDefault();
            buttonRouter[event.target.textContent](movie, userInfo)
        }
    })
}

let buttonRouter = {
    Like : addLike,
    Delete : deleteMovie,
    Edit: editMovie
}


async function deleteMovie(movie, user) {
    let url = `http://localhost:3030/data/movies/${movie._id}`
    let userInfo = JSON.parse(user)
    await fetch(url, {
        method: "DELETE",
        headers: {
            "X-Authorization": userInfo.accessToken
        }
    })
    loadHome()
}

async function addLike(movie, user) {
    console.log("wtf");
    let url = `http://localhost:3030/data/likes`
    let userInfo = JSON.parse(user)
    await fetch(url, {
        method : "POST",
        headers: {
            "content-type" : "application/json",
            "X-Authorization": userInfo.accessToken
        },
        body : JSON.stringify({
            movieId: movie._id
        })
    })
    updateLikeCount(movie._id)
    console.log("wow");
    viewMovieDiv.querySelector('.btn-primary').style.display = "none"
}



async function loadOptions(movie, userInfo) {
    let returnElements = '';
    if (userInfo) {
        if (JSON.parse(userInfo)._id == movie._ownerId) {
            returnElements += `<a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>`;

        } else if (JSON.parse(userInfo)._id) {
            if(await checkOwnLike(movie._id, JSON.parse(userInfo)) == 0) {
                returnElements += `<a class="btn btn-primary"" href="#">Like</a>`;
            }
        }
    }
    returnElements += `<span class="enrolled-span" id="likes" >Liked ${await getLikeCount(movie._id)}</span>`
    return returnElements;
}
async function getLikeCount(movieId) {
    let url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`;
    let response = await fetch(url)
    let likeCount = await response.json();
    return likeCount    
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
    <hr>
    <div class="card-footer">
        <a href="#/details/${movieInfo._id}">
            <button type="button" data-id="${movieInfo._id}" class="btn btn-info">Details</button>
        </a>
    </div>`;
    cardDeck.appendChild(cardDiv);
}

async function updateLikeCount(movieId) {
    let likeElement = viewMovieDiv.querySelector('#likes')
    likeElement.textContent = `Liked ${await getLikeCount(movieId)}`
}
async function checkOwnLike(movieId, userInfo) {
    let url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userInfo._id}%22`
    let response = await fetch(url)
    let obj = await response.json()
    return Object.keys(obj).length
}



export {
    loadMovies,
    showDetails
}