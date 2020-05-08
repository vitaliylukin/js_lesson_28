
//Подключаем пакет path
const path = require('path');

module.exports = {
    //точка входа
    entry: {
        main: './src/index.js' //подставляем это значение в свойство filename
    },
    //точка выхода
    output: {
        path: path.resolve(__dirname, 'dist'), //прописываем путь(первый параметр - папка с нашим проектом, второй - папка dist
        filename: '[name].js', //имя файла
        publicPath: '/dist'
    },
    //вытаскием ошибку сверху страницы с помощью overlay
    devServer: {
        overlay: true
    },
    //настраиваем правила
    module: {
        //массив, состоящий из объектов
        rules: [
            {
                test: /\.js$/, //указываем какие файлы будем проверять и применять к ним правила
                loader: 'babel-loader', //
                exclude: '/node_modules/' //исключаем все файлы из папки
            }
        ]
    }
};
