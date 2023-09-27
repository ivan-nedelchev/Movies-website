import { hideAll } from "./helper.js";
import { showDetails } from "./movies.js";
let editSection = document.getElementById('edit-movie');
let editForm = editSection.querySelector('form')
async function editMovie(movie, user) {
    let userInfo = JSON.parse(user)
    let url = `http://localhost:3030/data/movies/${movie._id}`
    hideAll()
    editSection.style.display = 'block';
    fillForm(movie)
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        let formData = new FormData(editForm)
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                "X-Authorization": userInfo.accessToken
            },
            body: JSON.stringify({
                title: formData.get('title'),
                description: formData.get('description'),
                img: formData.get('img')
            })
        })
        if(response.ok) {
            showDetails(movie._id)
        }
    })
}
function fillForm(movie) {
    editForm.querySelector('#title').value = movie.title;
    editForm.querySelector('[name="description"]').value = movie.description;
    editForm.querySelector('#imageUrl').value = movie.img;
    console.log('filled!')
}

export {
    editMovie
}