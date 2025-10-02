# 🔹CSRF Token in Express.js

CSRF stands for __Cross Site Request Forgery__.

for example, in the simple form, the information like html, route and other related info is always visible to the users. The hackers can access the information for hacking and do the CSRF __(Cross-Site Request Forgery)__ attack.

To prevent this, we can use __CSRF__ token, when the user visit your website, for example, he want to access the form page. Before opening the page, it generates the token on the server and sends it to the client as a response.

We always embed the hidden value in the form input like below:

```html
<input type='hidden' name='_csrf' value='XERD23SDF546TR'>
```

Token contains combination of random numbers and characters, and every user has different token. Server generates the random token and store it in the sessions.

So eventually, if the hackers find our your submission route, then he won't be able to manipulate the data because he doesn't have a token.

## 👉🏻 Getting started with CSRF Token

We're gonna use cookie-parser and csurf

```javascript
npm install cookie-parser csurf
```

We will include them in the file where we want to implement it.

```javascript
import cookieParser from 'cookie-parser';
import csrf from 'csurf'
```

then in the file, we will use the cookie-parser as our middleware

```javascript
app.use(cookieParser());
```

and we will also use csrf as our middleware.

```javascript
const csrfProtection = csrf({ cookie: true });
```

What is happening in the code, we set the cookie true in the csrf brackets. That was it for the cookie-parser. Whenever the user visits the website, the cookie is set in the server.
CSRF will check the token in the cookie and the form data.

We will use the csrf middleware in the route:

```javascript
app.get('/form', csrfProtection, (req, res) => {
    res.render('form', { req.csrfToken() })
})
```