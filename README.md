<h1>Please Note:</h1>
<h3>If you want to clone this repository, it will be a single folder with separate project folders inside. So, you will need to install the node modules for every single project, whether it is frontend or backend</h3>
<h4>Just select your folder and simply run <kbd>npm i</kbd> or <kbd>npm install</kbd> command in your terminal and you're good to go </h4>

---
---

# 👉🏻 Middlewares

 Humary pas bny bnaye middlewares bhi milty hain, jinko hum .use method se kaam me la skty hain.

```JavaScript

app.use((req, res, next) => {
    your code...
    next()
})

```
---
For example, hum chahty hain k logged in user admin hona chahiye... to hum aik middleware code likh skty hain jo check kre ga k user admin hai ya nai. jaisy hi user k credentials match ho jayn gy to yeh apne ap next pr move nai kre ga... hume is k liye **next()** function use krna hoga, like in the above code.

__*Note: hum is next() method k andr information bhi pass kr skty hain, brackets k andr*__
---
__*Note: Position matters in creating middlewares, always keep the middlewares above the routes*__
---
---
## 👉🏻 Types of middlewares:

- Application Level Middlewares
- Router Level Middlewares
- Error handling Middlewares
- Built in Middlewares
- Third Party Middlewares - like npm packages
---
### 👉🏻 [For more info, you can checkout ExpressJS official docs](https://expressjs.com/en/guide/using-middleware.html#using-middleware)

### 👉🏻 [For third party Middlewares](https://expressjs.com/en/resources/middleware.html)
---
---