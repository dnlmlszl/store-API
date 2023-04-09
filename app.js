const express = require("express");
const app = express();
require("dotenv").config();
require('express-async-errors')
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});

// products routes
app.use("/api/v1/products", productsRouter);

// NotFound && errors
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
