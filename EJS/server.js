import express from "express"
const app = express()

const port = 3001;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.get("/about", (req, res) => {
    var users = [
        {
            name: "John",
            age: 24,
            city: "New York"
        },
        {
            name: "Sarah",
            age: 19,
            city: "Pakistan"
        },
        {
            name: "Stark",
            age: 27,
            city: "New York"
        },
        {
            name: "Rogers",
            age: 150,
            city: "Brooklyn"
        },
        {
            name: "Paul",
            age: 24,
            city: "Lahore"
        },
    ]

    res.render("about", {
        title: "Home Page",
        message: "",
        items: users
    });
})

app.get("/form", (req, res) => {
    res.render("form", { message: null })
})

app.post("/submit", (req, res) => {
    const name = req.body.myname;
    const message = `Hello, ${name}! Your form has been submitted.`;
    res.render("form", { message: message })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})