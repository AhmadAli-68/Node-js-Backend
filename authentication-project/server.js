import express from 'express'
import session from 'express-session'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from './model/user.model.js'
const app = express()

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
    .then(() => console.log("MongoDB connected!"))

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}))

let checkLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('login')
    }
}

// Routes
app.get('/', checkLogin, (req, res) => {
    res.send(`<h1>Profile Page</h1>
        <h1>Welcome!!</h1>
        <p>Hello, ${req.session.user}</p>
        <button><a href="/logout">Logout</a></button>
        `)
})

app.get('/profile', checkLogin, (req, res) => {
    res.send(`<h1>Profile Page</h1>
        <h1>Welcome!!</h1>
        <p>Hello, ${req.session.user}</p>
        <button><a href="/logout">Logout</a></button>
        `)
})

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('login', { error: null })
    }
})

app.get('/register', (req, res) => {
    res.render('register', { error: null })
})

app.post('/register', async (req, res) => {
    const { username, userPassword } = req.body
    const hashedPassword = await bcrypt.hash(userPassword, 10)

    // res.send({username, userPassword: hashedPassword})
    await User.create({ username, userPassword: hashedPassword })
    res.redirect('login')
})

app.post('/login', async (req, res) => {
    const { username, userPassword } = req.body

    const user = await User.findOne({ username })
    if (!user) return res.render('login', { error: 'User not found.' })

    const isMatch = await bcrypt.compare(userPassword, user.userPassword)
    if (!isMatch) return res.render('login', { error: 'Invalid Password.' })

    req.session.user = username
    res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("login")
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})