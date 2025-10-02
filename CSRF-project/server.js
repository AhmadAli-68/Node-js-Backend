import express from 'express'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(cookieParser())
const csrfProtection = csrf({ cookie: true })

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.get('/myform', csrfProtection, (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() })
})

app.post('/submit', csrfProtection, (req, res) => {
    res.send(req.body)
})

app.listen(9999, () => {
    console.log('Server is running on port 9999.')
})