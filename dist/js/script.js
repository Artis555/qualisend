'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // menu
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        menuLinks = document.querySelectorAll('.menu__links'),
        overlay = document.querySelector('.menu__overlay'),
        promoTitle = document.querySelector('.promo__title'),
        promoButton = document.querySelector('.promo__btn'),
        header = document.querySelector('.promo__header');
    let isMenuOpen = false;

    // menu functions
    menuLinks.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('transitioned');
            promoTitle.classList.remove('transitioned');
            promoButton.classList.remove('transitioned');
            menu.classList.remove('active');
            header.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.style.pointerEvents = 'auto';
            isMenuOpen = false;
            enableScroll();
        });
    });

    hamburger.addEventListener('click', () => {
        hamburger.style.pointerEvents = 'none';
        if (!isMenuOpen) {
            menu.classList.add('active');
            header.classList.add('active');
            overlay.classList.add('active');
            hamburger.classList.add('active');
            setTimeout(() => {
                promoTitle.classList.add('transitioned');
                promoButton.classList.add('transitioned');
                menu.classList.add('transitioned');

            }, 10);
            disableScroll();
        } else {
            menu.classList.remove('transitioned');
            promoTitle.classList.remove('transitioned');
            promoButton.classList.remove('transitioned');
            setTimeout(() => {
                menu.classList.remove('active');
            }, 500);
            header.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            enableScroll();
        }
        setTimeout(() => {
            hamburger.style.pointerEvents = 'auto';
        }, 1000);
        isMenuOpen = !isMenuOpen;
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

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// animate
const animItems = document.querySelectorAll('.anim__item'),
    animLeft = document.querySelectorAll('.anim__left'),
    animRight = document.querySelectorAll('.anim__right');
window.addEventListener('scroll', animate);

function animate() {
    animItems.forEach(item => {
        if (isPartiallyVisible(item)) 
            item.classList.add('anim-active');
    });

    animLeft.forEach(item => {
        if (isPartiallyVisible(item)) 
            item.classList.add('anim-active');
    });


    animRight.forEach((item) => {
        if (isPartiallyVisible(item)) 
            item.classList.add('anim-active');
    });
}

function isPartiallyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

animate();

// card 
const cards = document.querySelectorAll('.anim-card');
cards.forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('card-flipped');
    });
});






