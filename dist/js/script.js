'use strict';


document.addEventListener('DOMContentLoaded', () => {

    // menu
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        menuLinks = document.querySelectorAll('.menu__links'),
        overlay = document.querySelector('.menu__overlay'),
        header = document.querySelector('.promo__header'),
        sidepanel = document.querySelector('.sidepanel'),
        sidepanelInfo = document.querySelector('.sidepanel__block'),
        sidepanelArrow = document.querySelectorAll('.sidepanel__arrow'),
        sidepanelText = document.querySelector('.sidepanel__text');
    let isMenuOpen = false;
    let isSidepanelOpen = false;




    // menu functions
    menuLinks.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            sidepanel.classList.remove('active');
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
            hamburger.classList.add('active');
        } else {
            menu.classList.remove('active');
            sidepanel.classList.remove('active');
            header.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
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

    const pageup = document.querySelector('.pageup');
    pageup.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    window.addEventListener('scroll', function () {
        if (window.scrollY > 1200 && pageup.classList.contains('pageup-none')) {
            pageup.classList.remove('pageup-none');
            pageup.classList.add('pageup-active');
            setTimeout(function () {
                pageup.classList.remove('pageup-hidden');
            }, 500);
        }
        else if (window.scrollY < 1200 && pageup.classList.contains('pageup-active')) {
            pageup.classList.add('pageup-hidden');
            setTimeout(function () {
                pageup.classList.add('pageup-none');
                pageup.classList.remove('pageup-active');
            }, 500);
        }
        const advantages = document.querySelector(".advantages"),
            portfolio = document.querySelector(".portfolio");
        if ((window.scrollY > advantages.offsetTop - 300 && window.scrollY < advantages.offsetTop + 200) || (window.scrollY > portfolio.offsetTop - 300 && window.scrollY < portfolio.offsetTop + 200)) {
            pageup.querySelector("svg path").style.fill = "#000";
        } else {
            pageup.querySelector("svg path").style.fill = "#fff";
        }
    });

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
