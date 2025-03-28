import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     console.log('Hello World!');
// })

let users = [];

function randomNumber() {
    return Math.floor(Math.random() * 100000000000)
}

app.get('/user', (req, res) => {
    console.log(req.body);

    let newUser = {
        id: randomNumber(),
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
    }

    users.push(newUser);
    res.status(201).send('User is Created!');
})

app.get('/user/:userId', (req, res) => {
    let userId = req.params.userId;
    let isFound = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            res.send(users[i]);
            isFound = true;
            break;
        }
    }

    if (!isFound) {
        res.status(204).send("User not found!");
    }
})

app.get('/users', (req, res) => {
    res.send(users);
})

app.put('/user/:userId', (req, res) => {
    res.send('User is modified!');

    let userId = req.params.userId;
    let userIndex = -1;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            userIndex = i;
            break;
        }
    }

    if (userIndex === -1) {
        res.status(204).send('User not found!');
    } else {
        if (req.body.fullname) {
            users[userIndex].fullname = req.body.fullname;
        };
        if (req.body.username) {
            users[userIndex].username = req.body.username;
        };
        if (req.body.password) {
            users[userIndex].password = req.body.password;
        };

        res.send(users[userIndex]);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})