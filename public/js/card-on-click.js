import { toSlug } from "./vietnamese-slug-converter.js";

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        let title = card.querySelector('.card-title').innerText;
        let id = card.id;
        location.href = `/posts/${toSlug(title)}-${id}`;
    })
})

const profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', () => {
    let dropdown = document.querySelector('.dropdown');
    let id = dropdown.id;
    let name = document.getElementById('dropdownMenu2').innerText;
    console.log(id);
    location.href = `/users/profile/${toSlug(name)}-${id}`;
})