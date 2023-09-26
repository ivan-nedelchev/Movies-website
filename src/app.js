import { loadHomePage } from "./router.js";
import { router } from "./router.js";


let navElement = document.querySelector('.navbar')
navElement.addEventListener("click", redirect)

function redirect(event) {
    if (event.target.tagName == "A") {
        event.preventDefault()
        router(new URL(event.target.href).pathname);
    }
}

loadHomePage()