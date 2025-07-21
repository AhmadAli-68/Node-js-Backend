import contact from "../models/contacts.js";
import mongoose from "mongoose";

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 3 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }

        const result = await contact.paginate({}, options)

        // res.send(result)

        res.render("home", {
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            currentPage: result.page,
            counter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            contacts: result.docs
        });


    } catch (error) {
        res.render("500", { message: error })
    }
}

export const getContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render("404", { message: "Invalid ID" })
    }

    try {
        const contacts = await contact.findById(req.params.id)
        if (!contacts) return res.render("404", { message: "Contact not found" })
        res.render("show-contact", { contacts });
        // res.json(contacts)
    } catch (error) {
        res.render("500", { message: error })
    }
}

export const addContactPage = (req, res) => {
    res.render("add-contact");
}

export const addContact = async (req, res) => {
    try {
        await contact.create(req.body)
        res.redirect("/");
    } catch (error) {
        res.render("500", { message: error })
    }
}

export const updateContactPage = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render("404", { message: "Invalid ID" })
    }

    try {
        const contacts = await contact.findById(req.params.id)
        if (!contacts) return res.render("404", { message: "Contact not found" })
        res.render("update-contact", { contacts });
    } catch (error) {
        res.render("500", { message: error })
    }
}

export const updateContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render("404", { message: "Invalid ID" })
    }

    try {
        const contacts = await contact.findByIdAndUpdate(req.params.id, req.body)
        if (!contacts) return res.render("404", { message: "Contact not found" })
        res.redirect("/");
    } catch (error) {
        res.render("500", { message: error })
    }
}

export const deleteContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render("404", { message: "Invalid ID" })
    }

    try {
        const contacts = await contact.findByIdAndDelete(req.params.id)
        if (!contacts) return res.render("404", { message: "Contact not found" })
        res.redirect("/");
    } catch (error) {
        res.render("500", { message: error })
    }
}