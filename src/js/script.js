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
            btnNext.style.pointerEvents = 'none';
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
            setTimeout(() => {
                btnNext.style.pointerEvents = 'auto';
            }, 150);
        });

        // init prev button
        btnPrev.addEventListener('click', () => {
            btnPrev.style.pointerEvents = 'none';
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
            setTimeout(() => {
                btnPrev.style.pointerEvents = 'auto';
            }, 150);
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


function CustomValidation() {

}

CustomValidation.prototype = {
    invalidities: [],
    validityChecks: [],
    addInvalidity: function (message) {
        this.invalidities.push(message);
    },
    getInvalidities: function () {
        return this.invalidities.join('. \n');
    },
    checkValidity: function (input) {
        for (var i = 0; i < this.validityChecks.length; i++) {
            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            let requirementElement = this.validityChecks[i].element;

            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }
            }
            if (isInvalid) break;
        }
    }
};

const formName = document.querySelector("#name"),
    formPhone = document.querySelector("#phone"),
    formText = document.querySelector("#question"),
    formEmail = document.querySelector("#email"),
    submit = document.querySelector(".contacts__btn");
formPhone.addEventListener("keyup", mask, false);
formPhone.addEventListener("focus", mask, false);
formPhone.addEventListener("blur", mask, false);


const inputs = [formName, formPhone, formText, formEmail];
var nameValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length == 0 || input.value == "";
        },
        invalidityMessage: 'Введите имя',
        element: formName
    },
    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/[0-9]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Должны быть только буквы',
        element: formName
    },
    {
        isInvalid: function (input) {
            return input.value.length < 2;
        },
        invalidityMessage: 'Не менее двух символов',
        element: formName
    }
];

var phoneValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length == 0 || input.value == "";
        },
        invalidityMessage: 'Введите телефон',
        element: formPhone
    },
    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/[a-zA-Z]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Должны быть только цифры',
        element: formPhone
    },
    {
        isInvalid: function (input) {
            return (input.value == null || input.value == "" || input.value.length == 0) ? true : false;
        },
        invalidityMessage: 'Введите телефон',
        element: formPhone
    },
    {
        isInvalid: function (input) {
            let value = input.value;
            value = value.replaceAll("+", "");
            value = value.replaceAll("-", "");
            value = value.replaceAll("(", "");
            value = value.replaceAll(")", "");
            value = value.replaceAll(" ", "");
            return value.length < 11;
        },
        invalidityMessage: 'Не менее одиннадцати символов',
        element: formPhone
    }
];

var emailValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length < 5;
        },
        invalidityMessage: 'Не менее пяти символов',
        element: formEmail
    },
    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/^[^@]+@[^@.]+\.[^@][^@]+$/);
            return illegalCharacters ? false : true;
        },
        invalidityMessage: `Email должен соответствовать шаблону-*@*.*`,
        element: formEmail
    }
];

formName.CustomValidation = new CustomValidation();
formName.CustomValidation.validityChecks = nameValidityChecks;

formPhone.CustomValidation = new CustomValidation();
formPhone.CustomValidation.validityChecks = phoneValidityChecks;


formEmail.CustomValidation = new CustomValidation();
formEmail.CustomValidation.validityChecks = emailValidityChecks;


inputs.forEach((e) => {
    if (e) {
        e.addEventListener('keyup', function () {
            if (e.value)
                e.classList.add("active");
            if (e != formText) checkInput(e);
        });
        e.addEventListener('focus', function () {
            e.classList.add("active");
            if (e != formText) checkInput(e);
        });
        e.addEventListener('blur', function () {
            if (!e.value)
                e.classList.remove("active");
        });
    }
});
submit.addEventListener('click', function () {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i]) {
            if (inputs[i] != formText) checkInput(inputs[i]);
        }
    }
});

function mask(event) {
    var matrix = "+7 (___)-___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) {
        val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type == "blur") {
        if (this.value.length == 2) {
            this.value = "";
        }
    } else {
        setCursorPosition(this.value.length, this);
    }
}

function checkInput(input) {
    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);

    if (input.CustomValidation.invalidities.length == 0 && input.value != '') {
        input.setCustomValidity('');
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
    }
}

function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
}





