import { loadHomePage } from "./router.js";
let createSection = document.getElementById("add-movie");
let submitForm = createSection.querySelector("form");
let url = 'http://localhost:3030/data/movies'; 
function showCreate() {
    createSection.style.display = "block";
    submitForm.addEventListener('submit', submitMovie);
}

async function submitMovie(event) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'))

    let formData = new FormData(submitForm);
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type" : "application/json",
            "X-Authorization": user.accessToken
        },
        body : JSON.stringify({
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('img')
        })
    })
    if(response.ok) {
        loadHomePage()
    }
}

export{
    showCreate
}