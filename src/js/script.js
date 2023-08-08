window.addEventListener("DOMContentLoaded", () => {
    const clas = require("../modules/class"),
        form = require("../modules/form"),
        loader = require("../modules/loader"),
        modal = require("../modules/modal"),
        slider = require("../modules/slider"),
        tab = require("../modules/tab"),
        timer = require("../modules/timer");
    clas();
    form();
    loader();
    modal();
    slider();
    tab();
    timer();
});
