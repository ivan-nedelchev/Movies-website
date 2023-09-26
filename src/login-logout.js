import { loadHome } from "./home.js";
import { hideAll } from "./helper.js";
let loginSection = document.getElementById('form-login')
let form = document.getElementById('login-form');
let navUser = document.querySelectorAll('.user');
let navGuest = document.querySelectorAll('.guest')
let url = 'http://localhost:3030/users/login'
function showLogin() {
    loginSection.style.display = "block";
}
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
        })
    });
    let objResponse = await response.json()
    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(objResponse))
        alert("SUCCESSFUL LOGIN")
        hideAll()
    loadHome()
    } else {
        alert("Invalid credentials")
    }
    form.reset()    
})
function logoutUser() {
    localStorage.clear()
    loadHome()
}

function checkLogin() {
    let userInfo = localStorage.getItem('user');
    let welcome = document.getElementById('welcome-msg')
    if(userInfo){
        welcome.textContent = `Welcome, ${JSON.parse(userInfo).username}`
        Array.from(navUser).forEach(user => user.style.display = "block")
        Array.from(navGuest).forEach(guest => guest.style.display = "none")
    }
    else{
        Array.from(navUser).forEach(user => user.style.display = "none")
        Array.from(navGuest).forEach(guest => guest.style.display = "block")
    }
    
}
export {
    showLogin, 
    logoutUser,
    checkLogin
}