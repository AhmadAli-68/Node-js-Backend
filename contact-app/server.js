import express from "express";
import ContactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";
const app = express();
const port = process.env.PORT;

// Database Connection
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));

// Routes
app.use("/", ContactRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})