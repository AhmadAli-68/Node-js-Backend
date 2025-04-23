import contact from "../models/contacts.js";

export const getContacts = async (req, res) => {
    const contacts = await contact.find()
    res.render("home", { contacts });
}

export const getContact = async (req, res) => {
    const contacts = await contact.findById(req.params.id)
    res.render("show-contact", { contacts });
    // res.json(contacts)
}

export const addContactPage = (req, res) => {
    res.render("add-contact");
}

export const addContact = async (req, res) => {
    await contact.create(req.body)
    res.redirect("/");
}

export const updateContactPage = async (req, res) => {
    const contacts = await contact.findById(req.params.id)
    res.render("update-contact", { contacts });
}

export const updateContact = async (req, res) => {
    await contact.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/");
}

export const deleteContact = async (req, res) => {
    await contact.findByIdAndDelete(req.params.id)
    res.redirect("/");
}