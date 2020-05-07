import scrollAnchors from "./scrollAnchors";

const toggleMenu = () => {

    const menu = document.querySelector('menu');

    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu')) {
            menu.classList.add('active-menu');
        } else if (target.tagName === 'A' || !target.closest('menu')) {
            menu.classList.remove('active-menu');
        }
    });

    //Scroll Anchors
    const scrollAnchors = () => {

        const anchors = document.querySelectorAll('ul > li > a[href*="#"]'),
            anchorArrow = document.querySelector('a[href="#service-block"]'),
            serviceBlock = document.querySelector('#service-block');

        /*Anchor Arrow*/
        anchorArrow.addEventListener('click', (event) => {
            event.preventDefault();
            serviceBlock.scrollIntoView({behavior: "smooth"})
        });


        /*Anchors of items*/
        anchors.forEach((item) => item.addEventListener('click', (event) => {
                event.preventDefault();
                const blockScroll = item.getAttribute('href').substr(1);
                document.getElementById(blockScroll).scrollIntoView({behavior: "smooth"})
            })
        );

    };

    scrollAnchors();

};

export default toggleMenu;