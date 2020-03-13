
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
    var header = $('.c-header'), nav = $('.c-header-bar__nav'),
        links = $('.c-header-links'), scrollPrev = 0;


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

    const closeSubItems = (level) => {
        level = level ? level : 1;

        if (model.subItems[level] && model.subItems[level].length) {
            model.subItems[level].forEach((el) => {
                el.parentElement.classList.remove(stateClasses.subItems);
            });

            if (model.subItems[level + 1]) {
                closeSubItems(level + 1);
            }

        }
    };

    const toggleLevel = (item, itemLevel) => {
        if (!item) {
            closeSubItems();
            return
        }

        let itemParent = item.parentElement;
        let level = itemLevel ? itemLevel : parseInt(el.getAttribute(modelSelectors.sabItemsAttr));

        if (itemParent.classList.contains(stateClasses.subItems)) {
            closeSubItems(level);
        }
        else {
            closeSubItems(level);
            itemParent.classList.add(stateClasses.subItems);
        }

    };

    const init = () => {
        model.nav = document.querySelector(modelSelectors.navContainer);
        model.menuToggler = document.querySelectorAll(modelSelectors.menuToggler);

        let allSubMenus = model.nav.querySelectorAll(`[${modelSelectors.sabItemsAttr}]`);

        allSubMenus.forEach(el => {
            let level = parseInt(el.getAttribute(modelSelectors.sabItemsAttr));
            if (!model.subItems[level]) {
                model.subItems[level] = [];
            }
            let elLevel = model.subItems[level];
            elLevel.push(el);

            console.log(model.subItems);


            el.addEventListener('click', function () {
                toggleLevel(el, level);
            });

        });

        console.log(model.menuToggler);
        // когда работаем с переключтелем используем цикл, т.к. их может быть больше 1
        model.menuToggler.forEach(el => {
            el.addEventListener('click', function (evt) {
                console.log(evt);
                toggleMenu();

            });
        });



        window.addEventListener('resize', function () {
            toggleMenu('close');
            closeSubItems();
        });
    };

    // в ретурн вписываем то что должно быть доступно из вне
    return {
        init: init
    };
})();

mainNav.init();
