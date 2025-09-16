# 🔹Middlewares

 Humary pas bny bnaye middlewares bhi milty hain, jinko hum .use method se kaam me la skty hain.

```JavaScript
app.use((req, res, next) => {
    your code...
    next()
})
```
---
For example, hum chahty hain k logged in user admin hona chahiye... to hum aik middleware code likh skty hain jo check kre ga k user admin hai ya nai. jaisy hi user k credentials match ho jayn gy to yeh apne ap next pr move nai kre ga... hume is k liye **next()** function use krna hoga, like in the above code.

---
__*Note: hum is next() method k andr information bhi pass kr skty hain, brackets k andr*__

__*Note: Position matters in creating middlewares, always keep the middlewares above the routes*__

---

## 👉🏻 Built-in Middlewares

```javascript
app.use(express.urlencoded({ extended: false }))
```

1. app.use(...)
    - This registers middleware in your Express app.
    - Middleware runs before your route handlers and is often used to process request data.

2. express.urlencoded(...)
    - This is a built-in Express middleware that parses incoming requests with application/x-www-form-urlencoded payloads (the format used by HTML form submissions by default).
    - It converts the form data into a JavaScript object and attaches it to req.body.

3. { extended: false }
    - This option controls which library is used to parse the data.
    - extended: false → Uses the Node.js built-in querystring library (simple, can only parse strings and arrays).
    - extended: true → Uses the qs library (more powerful, supports nested objects).

### Example:

```javascript
username = ahmad,
age = 22
```
then after this middleware

```javascript
req.body = { username: "ahmad", age: "22" }
```

---

```javascript
app.set('view engine', 'ejs')
```

- This line tells Express which template engine to use for rendering views.
- EJS (Embedded JavaScript) is a templating language that lets you write HTML pages with embedded JavaScript.
- With this setting:
    - You don’t need to write .ejs every time in res.render().
    - Express automatically looks for .ejs files in the views/ directory by default.

---

```javascript
app.use(express.json())
```
- This middleware tells Express to automatically parse JSON request bodies.
- It is typically used when building APIs or when clients (like Postman, React, Angular, or mobile apps) send JSON data.
- After this middleware, JSON data becomes available on req.body.

---

## 👉🏻 Types of middlewares:

- Application Level Middlewares
- Router Level Middlewares
- Error handling Middlewares
- Built in Middlewares
- Third Party Middlewares - like npm packages
---
👉🏻 For more info, you can checkout ExpressJS official docs: [click here](https://expressjs.com/en/guide/using-middleware.html#using-middleware)

👉🏻 For third party Middlewares: [click here](https://expressjs.com/en/resources/middleware.html)