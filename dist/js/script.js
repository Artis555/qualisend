'use strict';


document.addEventListener('DOMContentLoaded', () => {
    let hamburger = document.querySelector('.hamburger');
    let menu = document.querySelector('.menu');
    let sidepanelArrow = document.querySelector('.sidepanel__arrow');
    let sidepanel = document.querySelector('.sidepanel');
    let isMenuOpen = false;
    let isSidepanelOpen = false;

    hamburger.addEventListener('click', () => {
        if (!isMenuOpen) {
            menu.classList.add('active');
            document.querySelectorAll('.container').forEach(item => {
                item.classList.add('hidden');
            });
        } else {
            menu.classList.remove('active');
            document.querySelectorAll('.container').forEach(item => {
                item.classList.remove('hidden');
            });
        }
        isMenuOpen = !isMenuOpen;
    });

    sidepanelArrow.addEventListener('click', () => {
        if (!isSidepanelOpen) {
            sidepanel.classList.add('active');
            hamburger.style.display = 'none';
        } else {
            sidepanel.classList.remove('active');
            hamburger.style.display = 'flex';
        }
        isSidepanelOpen = !isSidepanelOpen;
    });
});