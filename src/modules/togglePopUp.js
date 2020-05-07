const togglePopUp = () => {

    const popUp = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn'),
        popUpContent = document.querySelector('.popup-content');

    /*popUp Animation*/
    let flyInterval,
        count = 0;
    let flyAnimate = function() {
        flyInterval = requestAnimationFrame(flyAnimate);
        count++;
        if (count < 100) {
            popUpContent.style.top = count + 'px';
        } else {
            cancelAnimationFrame(flyInterval);
        }
    };

    /*Open popUp*/
    popUpBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popUp.style.display = 'block';
            if (screen.availWidth >= 768) {
                flyInterval = requestAnimationFrame(flyAnimate);
            }
        });
    });

    /*Close popUp*/
    popUp.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popUp.style.display = 'none';
            }
        }

    });

};

export default togglePopUp;