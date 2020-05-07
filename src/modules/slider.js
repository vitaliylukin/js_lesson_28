const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        /*btn = document.querySelectorAll('.portfolio-btn'),*/
        slider = document.querySelector('.portfolio-content'),
        tabDots = document.querySelector('.portfolio-dots');

    let dot;

    for (let i = 0; i < slide.length; i++) {
        let newDot = document.createElement('li');
        newDot.classList.add('dot');
        tabDots.append(newDot);
        if (i === 0) {
            newDot.classList.add('dot-active');
        }
    }

    dot = document.querySelectorAll('.dot');

    //Активный (видимый) слайд
    let currentSlide = 0,
        interval;

    //Убираем класс "active"
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    //Добавляем класс "active"
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    //Автоматическая прокрутка слайдера
    const autoPlaySlide = () => {

        prevSlide(slide, currentSlide, 'portfolio-item-active'); //у текущего слайда убираем класс "active"
        prevSlide(dot, currentSlide, 'dot-active'); //у текущей точки убираем класс "active"

        currentSlide++; //переходим к следующему слайду
        if (currentSlide >= slide.length) { /*ограничиваем количество слайдов*/
            currentSlide = 0;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active'); //добавляем класс "active"
        nextSlide(dot, currentSlide, 'dot-active'); //добавляем класс "active"

    };

    //Запускаем слайдер
    const startSlide = (time = 3000) => {
        /*прокрутка слайдера через каждые ${time} секунды*/
        interval = setInterval(autoPlaySlide, time);
    };

    //Останавливаем слайдер
    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    });

    //Наведение мышки на стрелку или точку
    slider.addEventListener('mouseover',(event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlide();
        }
    });

    //Убрать мышку со стрелки или точки
    slider.addEventListener('mouseout',(event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlide();
        }
    });

    startSlide(1500);

};

export default slider;