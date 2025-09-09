import express from 'express'

const app = express()
// const router = express.Router()

//? Application-Level Middleware

const myMiddleware = (req, res, next) => {
    const d = new Date()
    console.log(`${req.method} ${req.url}`) // this will return the route method like get, post etc and route url like home, about in the console/terminal

    console.log(`Date: ${d.getDate()} - ${d.getMonth() + 1}`);
    next()
}

const myOtherMiddleware = (req, res, next) => {
    console.log("My Second Middleware.")
    next()
}

//? Router-Level Middleware

// router.use((req, res, next) => {
//     console.log("Router-Level Middleware");
//     next()
// })

// Routes

// router.get('/', (req, res) => {
//     res.send("<h1>Home Page</h1>")
// })

// router.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>")
// })

// app.use('/test', router) //? this will become nested route

//* 'like this http://localhost:3000/test' and 'like this http://localhost:3000/test/about'

//? Error-handling Middleware

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

app.get('/about', (req, res) => {
    res.send("<h1>About Page</h1>")
})

// Always after the routes

app.use((req, res) => {
    res.send("<h1>Error 404: Page not found</h1>")
}) //? in case, if the user want to access the route, that is not available in the website then that middleware will automatically initialized.

app.use((err, req, res, next) => {
    console.error(err.stack, "Error-Handling Middleware")
    res.status(500).send("Something got Messed Up!")
    next()
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})