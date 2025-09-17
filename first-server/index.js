/*
    ?  JSON -> Javascript Object Notation
    ? jsonp() -> Javascript Object Notation with Padding
    ? res.redirect() -> redirect to other page or website
    ? res.render() -> Open the HTML file using a template engine
    ? res.download() -> Download the file from the server
    ? res.sendFile() -> open the file in the side window also prevent from force downloading
*/

const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // it is used to parse incoming form data (URL-encoded) and make it accessible in req.body.

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.set('view engine', 'ejs') //* This is a template engine.

app.get('/', (req, res) => {
    res.jsonp(
        {
            id: 1,
            name: "Ahmad"
        }
    )
})

app.get("/about", (req, res) => {
    res.redirect("..")  //* .. or "back" opens the previous route or page
})

app.get("/user", (req, res) => {
    res.render('user') //? Open the HTML file using a template engine
})

// app.get("/download", (req, res) => {
//     res.download("./files/ahmad_cv.docx", 'My CV')
// })

app.get("/file", (req, res) => {
    res.sendFile(__dirname + "/files/ahmad_cv.docx")
})

app.get("/end", (req, res) => {
    res.write("This is a testing");
    res.end();
})

app.get("error", (req, res) => {
    res.sendStatus(200);
})

app.get("/anotherError", (req, res) => {
    res.status(200).send("OK")
})

app.get("/check", (req, res) => {
    console.log(res.headersSent);
    res.send("OK")
    console.log(res.headersSent);
})

app.get("/set", (req, res) => {
    res.set("custom-header", "Hello 123")
    console.log(res.get("custom-header"));
    res.send("Header is set")
})

// app.get('/about', (req, res) => {
//     res.send("<h1>Welcome to About Page</h1>")
// })

// app.get("/user/:userId-:bookId", (req, res) => {
//     res.send(req.params)
// })

//* Query Parameter

// app.get("/search", (req, res) => {
//     const name = req.query.name;
//     const age = req.query.age;

//     res.send(`Search results for Name: ${name}, Age: ${age}`)
// })

// app.get('/about/user', (req, res) => {
//     res.send("<h1>Welcome to User Page</h1>")
// })

//! ********************************************************************

app.post("/post", (req, res) => {
    res.send(req.body)
})

app.get("/hostname", (req, res) => {
    res.send(req.ips)
})

// hostname: get the host name e.g localhost
// ip: get the IP address
// method: used to get the request method e.g GET, POST, PUT, DELETE

app.get("/originalUrl/:ID", (req, res) => {
    res.send(req.route)
})

app.get("/accept", (req, res) => {
    if (req.accepts("html")) {
        res.send("<h1>Hello HTML</h1>")
    } else if (req.accepts("json")) {
        res.send({ message: "Hello JSON" })
    } else if (req.accepts("xml")) {
        res.send("<message>Hello XML</message>")
    } else {
        res.send("Content type is not supported.")
    }
})

app.get("/header", (req, res) => {
    res.send(req.headers.connection)
})

app.get('/get', (req, res) => {
    res.send(req.get("accept"))
})

app.post("/is", (req, res) => {
    if (req.is('application/json')) {
        res.send("Valid JSON Data")
    } else if (req.is('text/html')) {
        res.send("HTML Text")
    } else {
        res.status(400).send("Unsupported Content-type!")
    }
})