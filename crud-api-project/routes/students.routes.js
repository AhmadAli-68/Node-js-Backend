import express from 'express'
import Student from '../models/students.model.js'
const router = express.Router()

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
router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body)
        res.status(200).json(newStudent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update a student
router.put('/:id', async (req, res) => {
    try {
        const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true // when the data is updated, it will return the updated data.
        })

        if (!updateStudent) return res.status(404).json({ message: 'Student not found.' })

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
        res.status(200).json({ message: 'Student deleted successfully.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router