import express from 'express' 
import mongoose from 'mongoose' 
import dotenv from 'dotenv' 
import cors from 'cors' 
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'

const app = express() 
dotenv.config() 

// Константы
const PORT = process.env.PORT || 3002 
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = process.env.DB_PASSWORD 
const DB_NAME = process.env.DB_NAME 

// Middleware - функция, которая расширяет функции express
app.use(cors()) 
app.use(fileUpload())
app.use(express.json()) 
// app.use(express('uploads'))
// app.use('/uploads', express.static('uploads'));
app.use(express.static('uploads')); // теперь картинки загружаются на главную страничку

// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)


// Объявляет функцию start, которая асинхронно запускает сервер Express и подключается к базе данных MongoDB при помощи Mongoose.
async function start () {
    try { 
        await mongoose.connect (
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@fullstack.gbilnmq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`  
        )
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))   
    } catch (error) {
        console.log(error)
    }
}
start()    