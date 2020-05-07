const portfolioChangePhotos = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach((elem) => {

        elem.addEventListener('mouseenter', () => {
            let attrDataImg = elem.getAttribute('data-img');
            let attrStr = elem.getAttribute('src');
            elem.setAttribute('src', attrDataImg);
            elem.setAttribute('data-img', attrStr);
        });

        elem.addEventListener('mouseleave', () => {
            let attrDataImg = elem.getAttribute('data-img');
            let attrStr = elem.getAttribute('src');
            elem.setAttribute('src', attrDataImg);
            elem.setAttribute('data-img', attrStr);
        });

    });
};

export default portfolioChangePhotos;