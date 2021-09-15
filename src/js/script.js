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

    //slider
    let sliderContainer = document.querySelector('.slider__container');
    let btnPrev = document.querySelector('.slider__prev');
    let btnNext = document.querySelector('.slider__next');
    let countSlides = document.querySelectorAll('.slider__item').length / 2;
    let columns = [];
    let column = 0;
    let movePosition = 330;
    let position = -movePosition;
    let offset = 0;


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


    // slider functions
    function sliderInit() {
        // init columns array
        document.querySelectorAll('.slider__column').forEach(item => {
            columns.push(item.cloneNode(true));
        });
        
        // init prev button
        btnPrev.addEventListener('click', () => {
            column--;
            if (column < 0) {
                column = columns.length - 1;
            }
            sliderContainer.lastChild.remove();
            offset += movePosition;
            sliderContainer.prepend(columns[column]);
            position -= movePosition;
            sliderContainer.style.cssText = `
                left: ${position}px;
                transform: translateX(${offset}px);
            `;
        });

        // init next button
        btnNext.addEventListener('click', () => {
            sliderContainer.firstChild.remove();
            sliderContainer.append(columns[column]);
            console.log(columns.length);
            offset -= movePosition;
            position += movePosition;
            sliderContainer.style.cssText = `
                left: ${position}px;
                transform: translateX(${offset}px);
            `;
            column++;
            if (column >= columns.length) {
                column = 0;
            }
        });
    }

    sliderInit();
});
