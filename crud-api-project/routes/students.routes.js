import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs' // it is the file system package, comes with Node.js, which is used to delete the files from the server
import Student from '../models/students.model.js'
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb means callback
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Only images are allowed!'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter,
    limit: {
        fileSize: 1024 * 1024 * 3
    },
})

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) return res.status(404).json({ message: 'Student not found.' })
        res.json(student)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Add new student
router.post('/', upload.single('profile_pic'), async (req, res) => {
    try {
        // const newStudent = await Student.create(req.body)
        const student = new Student(req.body)
        if (req.file) {
            student.profile_pic = req.file.filename
        }

        const newStudent = await student.save()
        res.status(200).json(newStudent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update a student
router.put('/:id', upload.single('profile_pic'), async (req, res) => {
    try {
        const existingStudent = await Student.findById(req.params.id)
        if (!existingStudent) {
            if (req.file.filename) {
                const filePath = path.join('./uploads', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) console.log('Failed to delete old image: ', err)
                })
            }
            return res.status(404).json({ message: 'Student not found.' })
        }

        if (req.file) {
            if (existingStudent.profile_pic) {
                const oldImagePath = path.join('./uploads', existingStudent.profile_pic)
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.log('Failed to delete old image: ', err)
                })
            }

            req.body.profile_pic = req.file.filename
        }

        const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true // when the data is updated, it will return the updated data.
        })

        res.status(200).json(updateStudent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student) return res.status(404).json({ message: 'Student not found.' })
        if (student.profile_pic) {
            const filePath = path.join('./uploads', student.profile_pic)
            fs.unlink(filePath, (err) => {
                if (err) console.log('Failed to delete: ', err)
            })
        }
        res.status(200).json({ message: 'Student deleted successfully.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router

// unlink is used to delete the file or folder from the server.