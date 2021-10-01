$(document).ready(function () {
    $('.block1').slick({
        arrows: true,
    });
    $('.slider').slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: false,
        speed: 500,
        draggable: false,
        touchTreshold: 10,
        waitForAnimate: false,
        initialSlide: 0,
        infinite: false,
        responsive: [
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 0,
                }
            },
            {
                breakpoint: 590,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                }
            }
        ]
    });

    $('.scrol').slick({
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        speed: 500,
        draggable: false,
        touchTreshold: 10,
        waitForAnimate: false,
        initialSlide: 0,
        infinite: false,
        adaptiveHeight: true,
        asNavFor: ".small-scrol",
        responsive: [
            {
                breakpoint: 885,
                settings: {
                    appendArrows: $('.appendArrows')
                }
            }
        ]
    });

    $('.small-scrol').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        speed: 500,
        draggable: false,
        touchTreshold: 10,
        waitForAnimate: false,
        initialSlide: 0,
        infinite: false,
        adaptiveHeight: true,
        asNavFor: ".scrol"
    });

    $('.slider__fon').click(function (event) {
        $('.block6').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.close').click(function (event) {
        $('.block6').removeClass('active');
        $('body').removeClass('lock');
    });


    $('.burger').click(function (event) {
        $('.left-menu').toggleClass('active');
        $('body').toggleClass('lock');

    });



    $('.pluse-new').click(function (event) {
        $('.menu-new').toggleClass('active');
        $('.pluse-new').toggleClass('active');
    });
    $('.pluse-new.active').click(function (event) {
        $('.pluse-new').removeClass('active');
        $('.menu-new').removeClass('active');
    });


    $('.pluse-clothes').click(function (event) {
        $('.menu-clothes').toggleClass('active');
        $('.pluse-clothes').toggleClass('active');
    });
    $('.pluse-clothes.active').click(function (event) {
        $('.pluse-clothes').removeClass('active');
        $('.menu-clothes').removeClass('active');
    });


    $('.pluse-acs').click(function (event) {
        $('.menu-acs').toggleClass('active');
        $('.pluse-acs').toggleClass('active');
    });
    $('.pluse-acs.active').click(function (event) {
        $('.pluse-acs').removeClass('active');
        $('.menu-acs').removeClass('active');
    });


    $('.pluse-sale').click(function (event) {
        $('.menu-sale').toggleClass('active');
        $('.pluse-sale').toggleClass('active');
    });
    $('.pluse-sale.active').click(function (event) {
        $('.pluse-sale').removeClass('active');
        $('.menu-sale').removeClass('active');
    });


    $('.pluse-info').click(function (event) {
        $('.menu-info').toggleClass('active');
        $('.pluse-info').toggleClass('active');
    });
    $('.pluse-info.active').click(function (event) {
        $('.pluse-info').removeClass('active');
        $('.menu-info').removeClass('active');
    });


    $('.pluse-franch').click(function (event) {
        $('.menu-franch').toggleClass('active');
        $('.pluse-franch').toggleClass('active');
    });
    $('.pluse-franch.active').click(function (event) {
        $('.pluse-franch').removeClass('active');
        $('.menu-franch').removeClass('active');
    });

    // при body < 770px срабатывает jQuery и дает block4__conteiner класс active, а когда этот блок с классом active, он должен становиться слайдером, но не выходит(
    $('.block4__conteiner_active').slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        speed: 500,
        draggable: false,
        touchTreshold: 10,
        waitForAnimate: false,
        initialSlide: 0,
        infinite: false,
    });

});

//jQuery(document).ready(function(){
//  function classFunction(){
//    if(jQuery('body').width()<770){ jQuery('.block4__conteiner').addClass('active');
//    }
//    else{
//      jQuery('.active').removeClass('active');
//    }
//  }
//  
//  classFunction();
//  jQuery(window).resize(classFunction);
// });






$(document).ready(function () {
    let original_positions = [];
    let da_elements = document.querySelectorAll('[data-da]');
    let da_elements_array = [];
    let da_match_media = [];

    if (da_elements.length > 0) {
        let number = 0;
        for (let index = 0; index < da_elements.length; index++) {
            const da_element = da_elements[index];
            const da_move = da_element.getAttribute('data-da');
            const da_array = da_move.split(',');
            if (da_array.length == 3) {
                da_element.setAttribute('data-da-index', number);
                original_positions[number] = {
                    "parent": da_element.parentNode,
                    "index": index_in_parent(da_element)
                };
                da_elements_array[number] = {
                    "element": da_element,
                    "destination": document.querySelector('.' + da_array[0].trim()),
                    "place": da_array[1].trim(),
                    "breakpoint": da_array[2].trim()
                }
                number++;
            }
        }
        dynamic_adapt_sort(da_elements_array);
        for (let index = 0; index < da_elements_array.length; index++) {
            const el = da_elements_array[index];
            const da_breakpoint = el.breakpoint;
            const da_type = "max";

            da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
            da_match_media[index].addListener(dynamic_adapt);
        }
    }

    function dynamic_adapt(e) {
        for (let index = 0; index < da_elements_array.length; index++) {
            const el = da_elements_array[index];
            const da_element = el.element;
            const da_destination = el.destination;
            const da_place = el.place;
            const da_breakpoint = el.breakpoint;
            const da_classname = "_dynamic_adapt_" + da_breakpoint;

            if (da_match_media[index].matches) {
                if (!da_element.classList.contains(da_classname)) {
                    let actual_index;
                    if (da_place == 'first') {
                        actual_index = index_of_elements(da_destination)[0];
                    } else if (da_place == 'last') {
                        actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
                    } else {
                        actual_index = index_of_elements(da_destination)[da_place];
                    }
                    da_destination.insertBefore(da_element, da_destination.children[actual_index]);
                    da_element.classList.add(da_classname);
                }
            } else {
                if (da_element.classList.contains(da_classname)) {
                    dynamic_adapt_back(da_element);
                    da_element.classList.remove(da_classname);
                }
            }
        }
        custom_adapt();
    }

    function dynamic_adapt_back(el) {
        const da_index = el.getAttribute('data-da-index');
        const original_place = original_positions[da_index];
        const parent_place = original_place['parent'];
        const index_place = original_place['index'];
        const actual_index = index_of_elements(parent_place, true)[index_place];
        parent_place.insertBefore(el, parent_place.children[actual_index]);
    }

    function index_in_parent(el) {
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }

    function index_of_elements(parent, back) {
        const children = parent.children;
        const children_array = [];
        for (let i = 0; i < children.length; i++) {
            const children_element = children[i];
            if (back) {
                children_array.push(i);
            } else {
                if (children_element.getAttribute('data-da') == null) {
                    children_array.push(i);
                }
            }
        }
        return children_array;
    }
    function dynamic_adapt_sort(arr) {
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) { return 1 } else { return -1 }
        });
    }
    function custom_adapt() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    window.addEventListener('resize', function (event) {

    });
});

