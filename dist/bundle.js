/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/class.js":
/*!******************************!*\
  !*** ./src/modules/class.js ***!
  \******************************/
/***/ ((module) => {

function clas() {
    //Class
    class MenuCard {
        constructor(src, alt, title, deser, price, parentSelector, ...classes) {
            (this.src = src),
                (this.alt = alt),
                (this.title = title),
                (this.deser = deser),
                (this.price = price),
                (this.classes = classes),
                (this.parent = document.querySelector(parentSelector)),
                (this.transfer = 11520),
                this.chageToUZS();
        }
        chageToUZS() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((classname) =>
                    element.classList.add(classname)
                );
            }

            element.innerHTML = `
      
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.deser}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
          </div>`;

            this.parent.append(element);
        }
    }

    axios.get("http://localhost:3000/menu").then((data) => {
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu .container"
            ).render();
        });
    });

    // async function getRecource(url) {
    //     const res = await fetch(url);

    //     return await res.json();
    // }

    // getRecource("http://localhost:3000/menu").then((data) => {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             ".menu .container"
    //         ).render();
    //     });
    // });
}

module.exports = clas;


/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((module) => {

function form() {
    // FORM

    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        bindPostData(form);
    });

    const msg = {
        loading: "./img/Spinner-1s-200px.svg",
        success: "Thank's for submitting our form",
        failure: "Something went wrong",
    };

    async function postData(url, data) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = msg.loading;
            statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;`;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/request", json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(msg.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(msg.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
      <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
      </div>
      `;
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
}

module.exports = form;


/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((module) => {

function loader() {
    loader = document.querySelector(".loader");
    // Loader
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 2000);
}
module.exports = loader;


/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((module) => {

function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalTrigger.forEach((item) => {
        item.addEventListener("click", openModal);
    });

    modal.addEventListener("click", (e) => {
        if (e.target == modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((module) => {

function slider() {
    //slider

    const slides = document.querySelectorAll(".offer__slide"),
        next = document.querySelector(".offer__slider-next"),
        prev = document.querySelector(".offer__slider-prev"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(".offer__slider");

    let slideIndex = 1;
    let offset = 0;

    //---***---
    //     CAROUSEL SLIDER
    //---***---

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = ".5s ease all";
    slidesWrapper.style.overflow = "hidden";

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    const indicators = document.createElement("ol");
    const dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("carousel-dot");
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    // function deleteNotDigits(str) {
    //     return parseInt(str.replace(/\D/g, ""));
    // }
    // deleteNotDigits(width)

    next.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = ".5"));
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = ".5"));
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach((dot) => (dot.style.opacity = ".5"));
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}
module.exports = slider;


/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((module) => {

function tab() {
    // Tabs
    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}
module.exports = tab;


/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((module) => {

function timer() {
    // Timer

    const deadline = "2024-06-13";

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const timer = Date.parse(endtime) - Date.parse(new Date());

        if (timer <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            (days = Math.floor(timer / (1000 * 60 * 60 * 24))),
                (hours = Math.floor((timer / (1000 * 60 * 60)) % 24)),
                (minutes = Math.floor((timer / 1000 / 60) % 60)),
                (seconds = Math.floor((timer / 1000) % 60));
        }
        return { timer, days, hours, minutes, seconds };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.timer <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadline);
}
module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
window.addEventListener("DOMContentLoaded", () => {
    const clas = __webpack_require__(/*! ../modules/class */ "./src/modules/class.js"),
        form = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js"),
        loader = __webpack_require__(/*! ../modules/loader */ "./src/modules/loader.js"),
        modal = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js"),
        slider = __webpack_require__(/*! ../modules/slider */ "./src/modules/slider.js"),
        tab = __webpack_require__(/*! ../modules/tab */ "./src/modules/tab.js"),
        timer = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");
    clas();
    form();
    loader();
    modal();
    slider();
    tab();
    timer();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map