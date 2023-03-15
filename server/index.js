import express from 'express' // импортирует фреймворк Express для работы с веб-приложениями на Node.js;
import mongoose from 'mongoose' //импортирует библиотеку Mongoose для работы с базой данных MongoDB;
import dotenv from 'dotenv' // импортирует пакет dotenv для загрузки переменных окружения из файла .env;
import cors from 'cors' // импортирует middleware пакет cors для обработки CORS;

const app = express() // создает экземпляр приложения Express;
dotenv.config() // загружает переменные окружения из файла .env в process.env;

// Константы
const PORT = process.env.PORT || 3002 // устанавливает порт сервера на переменную окружения PORT или на 3002, если переменная окружения не определена;
const DB_USER = process.env.DB_USER // устанавливает имя пользователя базы данных MongoDB на переменную окружения DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD // устанавливает пароль базы данных MongoDB на переменную окружения DB_PASSWORD;
const DB_NAME = process.env.DB_NAME // устанавливает имя базы данных MongoDB на переменную окружения DB_NAME;

// Middleware - функция, которая расширяет функции express
app.use(cors()) // регистрирует middleware cors в Express;
app.use(express.json()) // регистрирует middleware для обработки тел запросов в формате JSON;

// Устанавливает маршрут по умолчанию и возвращает JSON-объект с сообщением "All is fine.";
app.get('/', (req, res) => { 
    return res.json({message: 'All is fine.'})
})

// Объявляет функцию start, которая асинхронно запускает сервер Express и подключается к базе данных MongoDB при помощи Mongoose.
async function start () {
    try { 
        await mongoose.connect (
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@fullstack.gbilnmq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`  // устанавливает соединение с базой данных MongoDB, используя данные из переменных окружения, которые были установлены ранее;
        )
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))   // запускает сервер на указанном порту и выводит сообщение в консоль о том, что сервер был успешно запущен;
    } catch (error) {
        console.log(error)
    }
}
start()   // вызывает функцию start для запуска сервера и подключения к базе данных.