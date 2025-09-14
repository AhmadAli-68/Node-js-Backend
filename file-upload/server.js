import express from 'express'
import multer from 'multer'
import path from 'path'
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

// file.mimetype.startsWith('image/')

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'userImage') {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Only .jpg or .png images are allowed'), false)
        }
    } else if (file.fieldname === 'userDocuments') {
        if (file.mimetype === 'application/pdf') {
            cb(null, true)
        } else {
            cb(new Error('Only PDFs are allowed for documents'), false)
        }
    } else {
        cb(new Error('Unknown Fields'), false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
    fileFilter
})

app.get('/', (req, res) => {
    res.render("myform")
})

//? For single file upload

// app.post('/submitForm', upload.single('userImage'), (req, res) => {
//     if (!req.files || req.file.length === 0) {
//         res.status(400).send('No file is uploaded.')
//     }

//     res.send(req.file.filename)
// })

//? For multiple files upload

// app.post('/submitForm', upload.array('userImage', 3), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         res.status(400).send('No file is uploaded.')
//     }

//     res.send(req.files)
// })

//? For Multiple fields file upload

app.post('/submitForm', upload.fields([
    { name: 'userImage', maxCount: 1 },
    { name: 'userDocuments', maxCount: 3 }
]), (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).send('No file is uploaded.')
    }

    res.send(req.files)
})

// Error handling in Multer

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            res.status(400).send(`Too many files uploaded!`)
        }

        return res.status(400).send(`Multer error: ${error.message} : ${error.code}`)

    } else if (error) {
        return res.status(500).send(`Something went wrong: ${error.message}`)
    }
    next()
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})