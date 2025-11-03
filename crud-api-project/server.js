import express from 'express'
import { connectDB } from './config/db.js'
import studentRoutes from './routes/students.routes.js'
import { MulterError } from 'multer'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(express.urlencoded({ extended: false }))

//Database
connectDB()

// Routes
app.use('/api/students', studentRoutes)

// Error handling
app.use((error, req, res, next) => {
    if (error instanceof MulterError) {
        return res.status(400).send(`Image Error: ${error.message} : ${error.code}`)
    } else if (error) {
        return res.status(500).send(`Something went wrong: ${error.message}`)
    }
    next()
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})