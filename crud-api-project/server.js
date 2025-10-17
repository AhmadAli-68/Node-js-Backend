import express from 'express'
import { connectDB } from './config/db.js'
import studentRoutes from './routes/students.routes.js'

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Database
connectDB()

// Routes
app.use('/api/students', studentRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})