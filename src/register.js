
let registerSection = document.getElementById('form-sign-up');
let form = registerSection.querySelector('form');
let url = `http://localhost:3030/users/register`;
function showRegister() {
    registerSection.style.display = "block";
    form.addEventListener('submit', registerUser)
}

async function registerUser(event) {
    event.preventDefault();
    let formData = new FormData(form)
    if (formData.get('password') == formData.get('repeatPassword')) {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            })
        })
        console.log(response);
    }
}

export {
    showRegister,
}