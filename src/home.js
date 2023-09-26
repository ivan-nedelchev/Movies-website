
import { updateNavView } from "./navigation.js";
import { checkLogin } from "./login-logout.js";
import { loadMovies } from "./movies.js";
let homeSection = document.getElementById("home-page")
let addButton = document.getElementById("add-movie-button")
let nav = document.querySelector('.navbar')
let movieShown = document.querySelector('#movie-example')

function loadHome() {
    checkLogin();
    loadMovies();
    homeSection.style.display = "block";
    nav.style.display = "flex";
    movieShown.replaceChildren()
}


export{
    loadHome
}