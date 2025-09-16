import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const app = express()

// to create custom collection name:
//? in the store key, with mongoUrl, create another key named "collectionName"

//* collectionName: "UserSessions"

// if you don't want to use cookie key:
//? same in the store key, within the mongoUrl key, use "ttl" key, and assign the time value to it, like in the cookie

//* ttl: 1000 * 60 * 60 * 24

app.use(session({
    secret: 'secretPassword',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/sessionDB' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`<h1>Username from session is: ${req.session.username}</h1>`)
    } else {
        res.send('<h1>No username found in session.</h1>')
    }
})

// for saving session on the page

app.get('/set-username', (req, res) => {
    req.session.username = 'Ahmad Ali'
    res.send('<h1>Username has been set in the session successfully.</h1>')
})

// read the session data

app.get('/get-username', (req, res) => {
    if (req.session.username) {
        res.send(`<h1>Username from session is: ${req.session.username}</h1>`)
    } else {
        res.send('<h1>No username found in session.</h1>')
    }
})

app.get('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Failed to destroy session.')
        }

        res.send('Session destroyed successfully.')
    }) // if in case any error occurs, we can set the error in the destroy() function
})

// Store sessions in MongoStore

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})