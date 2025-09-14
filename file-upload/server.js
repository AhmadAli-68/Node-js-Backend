import express from 'express'
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res,render("myForm")
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})