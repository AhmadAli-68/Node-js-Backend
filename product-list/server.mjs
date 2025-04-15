import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    currencyCode: String,
    numberOfSale: Number,
    rating: Number,
    isFreeShipping: Boolean,
    shopName: String,
    createdOn: { type: Date, default: Date.now },
});
const productModel = mongoose.model('Product', productSchema);

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.delete("/products/:id", async (req, res) => {
    let _id = req.params.id;

    try {
        const result = await productModel.findByIdAndDelete(_id);
        console.log("Deleted Product: ", result);
        res.send({
            message: "deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "DB Error"
        })
    }
})

app.put("/products/:id", async (req, res) => {
    let _id = req.params.id;
    let body = req.body;

    try {
        const result = await productModel.findByIdAndUpdate(_id, body);
        console.log("Updated Product: ", result);
        res.send({
            message: "Updated"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "DB Error"
        })
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})