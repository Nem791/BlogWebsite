import { toSlug } from "./vietnamese-slug-converter.js";

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        let title = card.querySelector('.card-title').innerText;
        let id = card.id;
        location.href = `/posts/${toSlug(title)}-${id}`;
    })
})