import { loadHome } from "./home.js";
import { showCreate } from "./create.js";
import { loadMovies } from "./movies.js";
import { showLogin, logoutUser, checkLogin } from "./login-logout.js";
import { showRegister } from "./register.js";

let allSections = document.querySelectorAll(".view-section");
let addButton = document.getElementById("add-movie-button");

let routes = {
    '/': loadHomePage,
    '/logout' : logout,
    '/login' : loadLogin,
    '/register' : loadRegister,
}

function router(url) {
    routes[url]();
}

function logout() {
    logoutUser()
    checkLogin()
}

function loadHomePage() {
    hideAll();
    loadHome();
    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        loadCreate();
    })
}
function loadCreate() {
    hideAll();
    showCreate();
}
function loadLogin() {
    hideAll();
    showLogin();
}
function loadRegister() {
    hideAll();
    showRegister()
    console.log("gotoo");
}

function hideAll() {
    for (const section of allSections) {
        section.style.display = "none";
    }
}





export{
    loadHomePage, router
}