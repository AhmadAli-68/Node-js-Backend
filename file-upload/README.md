# 🔹File Upload with Multer

- __Multer__
    1. Storage
        - Destination
        - Filename (suggestion: don't save file with same name)
    2. Limits
        - fileSize (bytes)
        - files (can also apply limits for how many files can be upload)
        - fields (we can set fields for multiple fields, e.g., one for image and one for resume)
        - fieldNameSize (we can specify the size of the fields.)
    3. File Filter (Optional)
        - Image (PNG, JPEG)
        - PDF
        - Excel
        - Word
        - Video

## 👉🏻 Getting Started with Multer

```javascript
npm install multer
```

```javascript
import multer from 'multer'
```

```javascript
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './uploads') // cb means callback
        // cb contains two parameters: one for error and one for folder
        // null means, it contains no error
    },

    filename: function(req, file, cb) {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)

        // here path.extname is from package called 'path', we have to import it on top. It is used to extract the extension of the file being uploaded.
    }
})
```

```javascript
const limits = {
    fileSize: 1024 * 1024 * 5 // 5 MB of file size
    // 1KB = 1024 Bytes
}
```

```javascript
const upload = multer({
    storage: storage,
    limits: limits
})
```

```javascript
// We will use it as a middleware in our routes

app.post('/submitForm', upload.single('imageFile'), (req, res) => {
    res.send(req.file)

    // here single means, we can select a single image of file.
})
```

```javascript
// For multiple files:

upload.array('imageFile', 5) // which means, user can upload max 5 images/files. 

// for multiple fields, for example, one pic + documents,

upload.fields([
    {
        name: 'profilePic',
        maxCount: 1
    },
    {
        name: 'documents',
        maxCount: 3
    }
])

// Here we will upload files in the form of array of objects.
```

For more info: [Click here](https://www.npmjs.com/package/multer)