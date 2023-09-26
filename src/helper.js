let allSections = document.querySelectorAll(".view-section");


function hideAll() {
    for (const section of allSections) {
        section.style.display = "none";
    }
}

export{
    hideAll,
    
}