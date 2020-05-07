const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    /*Функция, которая берет значения и считает итоговую сумму*/
    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            count = 0;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        /*Количество помещений*/
        if (calcCount.value && calcCount.value < 1) {
            countValue = 0;
        } else if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        /*Срок выполнения*/
        if (calcDay.value && calcDay.value < 1) {
            dayValue = 0;
        } else if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        /*Если заполнены оба инпута, то умножаем их на price, если нет - то приравниваем к 0*/
        if (typeValue && squareValue) {
            total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
        }

        if (dayValue === 0 || countValue === 0) {
            totalValue.textContent = '0';
        }

        //Перебор цифр
        const totalCounter = () => {
            count += 5;
            if (count <= total) {
                totalValue.textContent = count;
            } else {
                clearInterval(idInterval);
            }
        };

        const idInterval = setInterval(totalCounter);

    };


    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        //Если произошли изменения по клику на select или input
        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });

    //Calculator validation
    const checkInputByNumbers = document.querySelectorAll('.calc-block input[type=number]');
    checkInputByNumbers.forEach((elem) => {
        elem.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/, '');
        })
    });

};

export default calc;