$(document).ready(function () {
    var header = $('.c-header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 500 && scrolled > scrollPrev) {
            header.addClass('isScroll');
        } else {
            header.removeClass('isScroll');
        }
        scrollPrev = scrolled;
    });
});

var button = document.querySelector('.js-menu-btn');
var menu = document.querySelector('.js-nav')

button.onclick= function(event) {
    button.classList.toggle('isActive');
    menu.classList.toggle('isActive');

}

