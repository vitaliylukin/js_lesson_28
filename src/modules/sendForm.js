const sendForm = () => {

    //Сообщения для пользователя
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelectorAll('form'),
        allInputs = document.querySelectorAll('form input');

    //Создаем div с сообщением
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2 rem;';
    //Изменение цвета для сообщения формы в модальном окне
    if (document.getElementById('form3')) {
        statusMessage.style.cssText = 'color: #fff;';
    }

    let checkInputByRussianWords = document.querySelectorAll('[name="user_name"], [name="user_message"]');
    checkInputByRussianWords.forEach((elem) => {
        elem.addEventListener('input', function() {
            this.value = this.value.replace(/[^А-Яа-яЁё ]/, '');
        })
    });

    //Проверяем инпуты на число
    const checkInputByNumbers = document.querySelectorAll('[name="user_phone"]');
    checkInputByNumbers.forEach((elem) => {
        elem.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9\+]/, '');
        })
    });

    form.forEach((elem) => {
        //Навешиваем на форму обработчик событий submit
        elem.addEventListener('submit', (event) => {

            event.preventDefault(); //запрещаем перезагрузку страницы
            elem.appendChild(statusMessage); //помещаем на страницу statusMessage
            statusMessage.textContent = '';
            statusMessage.classList.add('sk-spinner-pulse');

            //перед отправкой данных нужно их получить с помощью FormData
            const formData = new FormData(elem); //получаем все данные из нашей формы
            /*Получаем объект с нашими данными*/
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });

            /*Отправляем и обрабатываем запрос на сервер*/
            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        /*если статус не 200, то обрабатываем запрос как ошибку*/
                        throw new Error('status network not 200')
                    }
                    statusMessage.classList.remove('sk-spinner-pulse');
                    statusMessage.textContent = successMessage;
                })
                .catch((error) => {
                    statusMessage.classList.remove('sk-spinner-pulse');
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                });

            allInputs.forEach((elem) => {
                elem.value = '';
            });
        });
    });

    /*Функция запроса на сервер*/
    const postData = (body) => {
        return fetch('server.php', {
            method: 'POST', //указывает POST-запрос, т.к. по умолчанию у fetch() идет метод GET
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

};

export default sendForm;