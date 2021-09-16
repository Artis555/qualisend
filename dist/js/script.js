'use strict';


document.addEventListener('DOMContentLoaded', () => {

    // menu
    let hamburger = document.querySelector('.hamburger');
    let menu = document.querySelector('.menu');
    let menuLinks = document.querySelectorAll('.menu__links');
    let overlay = document.querySelector('.menu__overlay');
    let header = document.querySelector('.promo__wrapper');
    let sidepanel = document.querySelector('.sidepanel');
    let sidepanelInfo = document.querySelector('.sidepanel__block');
    let sidepanelArrow = document.querySelectorAll('.sidepanel__arrow');
    let sidepanelText = document.querySelector('.sidepanel__text');
    let isMenuOpen = false;
    let isSidepanelOpen = false;

    


    // menu functions
    menuLinks.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            sidepanel.classList.remove('active');
            header.classList.remove('active');
            overlay.classList.remove('active');
            isMenuOpen = !isMenuOpen;
        });
    });

    hamburger.addEventListener('click', () => {
        if (!isMenuOpen) {
            menu.classList.add('active');
            sidepanel.classList.add('active');
            header.classList.add('active');
            overlay.classList.add('active');
        } else {
            menu.classList.remove('active');
            sidepanel.classList.remove('active');
            header.classList.remove('active');
            overlay.classList.remove('active');
        }
        isMenuOpen = !isMenuOpen;
    });

    sidepanelArrow.forEach(item => {
        item.addEventListener('click', () => {
            if (!isSidepanelOpen) {
                sidepanelInfo.classList.add('active');
                sidepanelText.classList.add('active');
                hamburger.style.display = 'none';
            } else {
                sidepanelInfo.classList.remove('active');
                sidepanelText.classList.remove('active');
                hamburger.style.display = 'flex';
            }
            isSidepanelOpen = !isSidepanelOpen;
        });
    });

    const pageUp =  document.querySelector('.pageup');
    pageUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })

    

    //slider
    let btnPrev = document.querySelector('.slider__prev');
    let btnNext = document.querySelector('.slider__next');
    let columns = [];
    let positions = new Map();
    let movePosition = 330;

    function sliderInit() {
        // init columns array and map with positons
        document.querySelectorAll('.slider__column').forEach(item => {
            columns.push(item);
            positions.set(item, 0);
        });

        // init next button
        btnNext.addEventListener('click', () => {
            for (let i = 0; i < columns.length - 1; i++) {
                positions.set(columns[i], positions.get(columns[i]) + movePosition);
                columns[i].style.cssText = `
                    visibility: visible;
                    transform: translateX(${positions.get(columns[i])}px);
                `;
            }
            positions.set(columns[columns.length - 1], positions.get(columns[columns.length - 1]) - 4 * movePosition);
            columns[columns.length - 1].style.cssText = `
                visibility: hidden;
                transform: translateX(${positions.get(columns[columns.length - 1])}px);
            `;
            columns.unshift(columns.pop());
        });

        // init prev button
        btnPrev.addEventListener('click', () => {
            for (let i = 1; i < columns.length; i++) {
                positions.set(columns[i], positions.get(columns[i]) - movePosition);
                columns[i].style.cssText = `
                    visibility: visible;
                    transform: translateX(${positions.get(columns[i])}px);
                `;
            }
            positions.set(columns[0], positions.get(columns[0]) + 4 * movePosition);
            columns[0].style.cssText = `
                visibility: hidden;
                transform: translateX(${positions.get(columns[0])}px);
            `;
            columns.push(columns.shift());
        });
    }

    sliderInit();
});
