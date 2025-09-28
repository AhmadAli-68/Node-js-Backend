import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser('mySecretKey123'))

app.get('/', (req, res) => {
    var home = `Welcome to Home Page`

    const username = req.cookies.username
    if (!username) {
        res.send(`${home} : No Cookie found.`)
    }

    res.send(`${home} : cookie found: ${username}`)
})

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'Ahmad Ali', {
        maxAge: 1000 * 60 * 15, // 15 minutes
        httpOnly: true, // This cookie is only accessible by the web server
        signed: true,
    })

    res.send('Cookie has been set')
})

app.get('/get-cookie', (req, res) => {
    // const username = req.cookies.username
    const username = req.signedCookies.username // for signed cookies
    if (!username) {
        res.send('No Cookie found.')
    }

    res.send(`Cookie found: ${username}`)
})

app.get('/delete-cookie', (req, res) => {
    const username = req.cookies.username
    if (!username) {
        res.send('No cookie found')
    }
    res.clearCookie('username')
    res.send("Cookie has been deleted.")
})

app.listen(2000, () => {
    console.log('Server is running on port 2000.')
})