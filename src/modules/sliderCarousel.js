'use strict';


import tabs from "./modules/tabs";

class SliderCarousel  {
    constructor({
                    main,
                    wrap,
                    next,
                    prev,
                    infinity = false,
                    position = 0,
                    slidesToShow = 3, //количество показываемых слайдов
                    responsive = []
    }) {
        if (!main || !wrap) {
            console.warn('slider-carousel: Необходимо 2 свойства, "main" "wrap"!')
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position, //ограничение прокрутки слайдера
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow), //ширина слайдера
            maxPosition: this.slides.length - this.slidesToShow
        };
        this.responsive = responsive;
    }

    //метод, который запускаеи слайдер
    init() {

        this.addGloClass(); //запускаем добавление классов
        this.addStyle(); //запускаем добавление стилей

        /*Если кнопки переданы, то запускаем слайдер. Если не переданы, то передаем и потом запускаем слайдер*/
        if (this.prev && this.next) {
           this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        if (this.responsive) {
            this.responseInit();
        }
    }

    //метод, который добавляет классы для элементов
    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    //метод, который добавляет стили для классов
    addStyle() {
        let style = document.getElementById('sliderCarousel-style'); //создаем тег style, в котором будут прописаны стили
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style'; //присваиваем id для тега style
        }

        style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }
            .glo-slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .glo-slider__item {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto 0 !important;
                
            }
        `;
        document.head.appendChild(style); //добавляем тег style в head
    }

    //метод, который добавляет стили для классов
    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this)); //слайдер листается влево
        this.next.addEventListener('click', this.nextSlider.bind(this)); //слайдер листается вправо
    }

    //метод, который листает слайдер влево
    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
    }

    //метод, который листает слайдер вправо
    nextSlider() {
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
    }

    //метод, который добавляет кнопки стрелок
    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .glo-slider__prev,
            .glo-slider__next {
                margin: 0 10px;
                background: transparent;
                border: 20px solid transparent; 
                cursor: pointer;
            }
            .glo-slider__prev {
                border-right-color: #19b5fe;
            }
            .glo-slider__next {
                border-left-color: #19b5fe;
            }
            .glo-slider__prev:hover,
            .glo-slider__next:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:focus {
                background: transparent;
                outline: transparent;
            }
        `;

        document.head.appendChild(style);
    }

    //метод, который адаптирует слайдер
    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max( ...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle()
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle()
            }
        };

        checkResponse();

        window.addEventListener('resize', checkResponse);

    }

}


export default SliderCarousel;











