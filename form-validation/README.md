# 🔹Implement Form Validation

Form validations are used to prevent the users to enter the wrong information. So, to prevent that, the package *"express-validator"* is used. 

```javascript
npm i express-validator

import { body, validationResult } from 'express-validator'

let validationRegistration = [
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').isLength({min: 6, max: 10}).withMessage('Password must be must be 5 to 10 characters long.')
]
```
---
Isko hum middleware k tor pr use krain gy, like in the below:

```javascript
app.post('/save-form', validationRegistration, (req, res) => {
    const result = validationResult(req)
    res.send(result)
})
```
---
## 👉🏻 Validation Methods

- notEmpty()
- isEmail()
- isLength(options)
- isNumeric()
- isAlpha()
- isAlphanumeric()
- isURL()
- isDate()
- isln()
- isStrongPassword()
- isUpperCase()
- isLowerCase()
- matches(pattern)
---
## 👉🏻 Sanitization Methods

- trim()
- Itrim()
- rtrim()
- escape()
- unescape()
- normalizeEmail()
- tolnt()
- toFloat()
- toBoolean()
---
## 👉🏻 Custom Validations

- custom(validator)
- customSanitizer(sanitizer)

For more info about these methods: [click here](https://github.com/validatorjs/validator.js)