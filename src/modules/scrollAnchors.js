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

export default scrollAnchors;