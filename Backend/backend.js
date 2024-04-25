/*
Author: Jacob Garcia
ISU Netid : jacobgar@iastate.edu
Date : 4/27/24
*/

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/products", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("fakestore")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/products/:id", async (req, res) => {
    const productId = Number(req.params.id);
    console.log("Product to find :", productId);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": productId };
    const results = await db.collection("fakestore")
        .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/addProduct", async (req, res) => {
    try {
        const newProduct = req.body;

        const results = await db.collection("fakestore").insertOne(newProduct);

        res.status(200).json({ message: "Product added successfully", insertedId: results.insertedId });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Product to delete :", id);
        const query = { id: id };

        const results = await db.collection("fakestore").deleteOne(query);
        res.status(200);
        res.send(results);
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.put("/updateProduct/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Product to Update :", id);
    console.log(req.body);
    const updateData = {
        $set: {
            "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description
        }
    };
    const options = {};
    const results = await db.collection("fakestore").updateOne(query, updateData, options);

    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200);
    res.send(results);
});