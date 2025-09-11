import express from 'express'
import { body, validationResult } from 'express-validator'
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var validationRegistration = [
    body('username')
        .notEmpty()
        .isLength({ min: 3 })
        .isAlpha()
        .withMessage('Username is required.')
        .trim()
        .custom(value => {
            if (value === 'admin') {
                throw new Error('Username "Admin" is not allowed.')
            }
            return true
        })
        .customSanitizer(value => value.toLowerCase()),

    body('userEmail')
        .isEmail()
        .withMessage("Please provide a valid Email Id.")
        .normalizeEmail(),

    body('userPass')
        .isLength({ min: 3, max: 10 })
        .withMessage("Password must be between 5 and 10 characters.")
        .isStrongPassword().withMessage("Password must be strong."),

    body('userAge')
        .isNumeric()
        .isInt({ min: 18 }).withMessage("Age must be 18 years old.")
        .withMessage("Age must be number."),

    body('userCity')
        .isIn('Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Faisalabad')
        .withMessage('Invalid city name')
]

app.get('/myForm', (req, res) => {
    res.render('form');
    res.render('form', { errors: 0 })
})

app.post('/saveForm', validationRegistration, (req, res) => {
    const error = validationResult(req)

    if (error.isEmpty()) {
        res.send(req.body)
    }
    res.render('form', { errors: error })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})