# 🔹Cookies in Express.js

When a user visits a web page, sends the request to the server and see specific results. As the user is visiting the web page or login in the web page or fill some form, we want to store the temporary information on the user's device. __*So that temporary information stored in the user's device is called cookies.*__

---

### *Note: As in the cookies, the temporary information is stored in the user's device. But in the sessions, the temporary information is stored in the server.*

---

## 👉🏻 Use-case of Cookies

- User Authentication
- Shopping Cart
- Flash Messages (send messages from one page to another in the same website)
- Remember Me / Auto Login
- Theme Preferences
- Language Selection
- Form Data Preservation

## 👉🏻 Working Steps in Cookies

Install the cookie-parser package using npm

```javascript
npm install cookie-parser
```

Include it in your file

```javascript
import cookieParser from 'cookie-parser'
```

We will this package as our middleware

```javascript
app.use(cookieParser())

// another method by setting the password
app.use(cookieParser('secretKey')) // These are called signed cookies.

// We use this approach, in case, if someone tries to tamper/interfere with the cookie, so to prevent that, we can set a password in our cookie.
```

Store Cookie

```javascript
res.cookie('key', 'value', {
    maxAge: // define time in milliseconds (1000 * 60 * 60 *24 ) for after how much time the cookie will be destroyed.
    httpOnly: true, // in case, to protect the cookie from other website
    secure: true, // whenever the cookie is read, it checks if the connection protocol is secure (https://) or not (http://)
    sameSite: 'strict' or 'lax' or 'none', 
    // 'strict' checks if we don't want other websites to read the cookies.

    // 'lax' same as 'strict', by-default, it is always 'lax' but not secure

    // 'none' means the other websites can read the cookies

    signed: true, // by-default, it is false, it tells that the cookie is signed

    // in that object, all these key-values are optional
})
```

Read Cookie

```javascript
res.send(req.cookies.key)
```

Delete Cookie

```javascript
res.clearCookie('key')
```

For more info: [click here](https://www.npmjs.com/package/cookie-parser)