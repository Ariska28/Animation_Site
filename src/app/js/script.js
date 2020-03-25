
const bodyLocker = (function () {
    let locker = {};
    const lockerClass = 'no-scroll';
    const lockerTarget = $('body');

    locker.isLock = false;
    locker.enable = function () {
        lockerTarget.addClass(lockerClass);
        locker.isLock = true;
    };
    locker.disable = function () {
        lockerTarget.removeClass(lockerClass);
        locker.isLock = false;
    };
    locker.toggle = function () {
        if (locker.isLock) {
            locker.disable();
        } else {
            locker.enable();
        }
    };
    return locker;
})();

const scrollingTo = (function () {

    const selectorAttr = 'data-goto';

    function scrolling(position, speed) {
        const topOffset = 80;
        let maxPosition = $(document).innerHeight() - $(window).outerHeight();
        let newScrollPosition = maxPosition < (position - topOffset) ? maxPosition : position - topOffset;

        speed = !!(speed) ? speed : 1000;

        $([document.documentElement, document.body]).animate({
            scrollTop: newScrollPosition
        }, speed);
    }

    return {
        init: function () {
            $('[' + selectorAttr + ']').on('click', function (event) {
                event.preventDefault();
                let newItem = $(this).attr('href') ? $(this).attr('href') : $(this).attr(selectorAttr);
                let newPosition = window.pageYOffset;
                switch (newItem) {
                    case 'next':
                        newPosition = $(this).offset().top + $(this).innerHeight();
                        break;
                    case 'prev':
                        newPosition = $(this).offset().top + $(this).innerHeight();
                        break;
                    case 'top':
                        newPosition = 0;
                        break;
                    default:
                        if ($(newItem).length) {
                            newPosition = $(newItem).offset().top;
                        }
                        break;
                }
                scrolling(newPosition);
            });
        },
        goToBlock: function ($block, offsetBefore, speed) {
            let newPosition = window.pageYOffset;
            if (!offsetBefore) { offsetBefore = 0 }

            newPosition = newPosition - offsetBefore;

            if ($block.length) {
                newPosition = $block.offset().top - offsetBefore;
            }

            scrolling(newPosition, speed);
        }
    }
})();

const mainNav = (function () {
    const stateClasses = {
        mobileTogler: 'isActive',
        mobileNav: 'isMobileActive',
        subItems: 'isExpand'
    };
    const model = {
        menuIsOpened: false,
        subItems: []
    };
    const modelSelectors = {
        menuToggler: '.js-menu-btn',
        navContainer: '.js-navigation',
        sabItemsAttr: 'data-toggle-level'
    };
    var header = $('.js-header'), nav = $('.js-nav'),
        links = $('.js-links'), scrollPrev = 0;


    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 70 && scrolled > scrollPrev) {
            header.addClass('isScroll');
            nav.addClass('isHidden');
            links.addClass('isHidden');
        }
        else if (scrolled > 70) {
            nav.removeClass('isHidden');
            links.removeClass('isHidden');
            header.removeClass('isScroll');
            header.addClass('isBackground');
        }
        else {
            header.removeClass('isScroll');
            nav.removeClass('isHidden');
            links.removeClass('isHidden');
            header.removeClass('isBackground');
        }
        scrollPrev = scrolled;
    });

    const toggleMenu = (newState) => {
        let switchTo = newState ? newState : (model.menuIsOpened ? 'close' : 'expand');
        switch (switchTo) {
            case 'expand':
                model.menuToggler.forEach(el => { el.classList.add(stateClasses.mobileTogler) });
                model.nav.classList.add(stateClasses.mobileNav);
                model.menuIsOpened = true;
                bodyLocker.enable();
                break;
            case 'close':
                model.menuToggler.forEach(el => { el.classList.remove(stateClasses.mobileTogler) });
                model.nav.classList.remove(stateClasses.mobileNav);
                model.menuIsOpened = false;
                bodyLocker.disable();
                break;
            default:
                toggleMenu('close');
        }
    };

    const init = () => {
        model.nav = document.querySelector(modelSelectors.navContainer);
        model.menuToggler = document.querySelectorAll(modelSelectors.menuToggler);

        let allSubMenus = model.nav.querySelectorAll(`[${modelSelectors.sabItemsAttr}]`);


        console.log(model.menuToggler);
        model.menuToggler.forEach(el => {
            el.addEventListener('click', function (evt) {
                console.log(evt);
                submenu.classList.remove('isOpen');
                item.classList.remove('isButton');
                arrow.classList.remove('isHidden');
                submenu2.classList.remove('isOpen');
                item2.classList.remove('isButton');
                arrow2.classList.remove('isHidden');
                const subitems = Array.prototype.slice.call(
                    sublist.children
                );
                const arrplus = Array.prototype.slice.call(
                    document.querySelectorAll('.c-header-bar__sublist-plus')
                );
                const expend = document.querySelector('.c-header-bar__sublist-plus:not(.isExpand)')

                for (let items of subitems) {
                    items.children[1].classList.remove('isVisible');
                    items.classList.remove('isBackground');
                };
                for (let plus of arrplus) {
                    if(plus !== expend) 
                    plus.classList.remove('isExpand')
                }
                toggleMenu();
            });
        });
        let submenu = document.getElementById('sublist');
        let item = document.getElementById('button');
        let arrow = document.getElementById('arrow');

        let submenu2 = document.getElementById('sublist-2');
        let item2 = document.getElementById('button-2');
        let arrow2 = document.getElementById('arrow-2');

        item.onclick = function () {
            submenu.classList.toggle('isOpen');
            item.classList.toggle('isButton');
            arrow.classList.toggle('isHidden');

        };
 
        item2.onclick = function () {
            submenu2.classList.toggle('isOpen');
            item2.classList.toggle('isButton');
            arrow2.classList.toggle('isHidden');
        };

        submenu.onclick = function (e) {
            e.target.parentNode.classList.toggle('isBackground')
            e.target.nextElementSibling.classList.toggle('isVisible');
            e.target.children[1].classList.toggle('isExpand');
        }


        window.addEventListener('resize', function () {
            toggleMenu('close');

            closeSubItems();
        });
    };
    return {
        init: init
    };
})();
mainNav.init();




















