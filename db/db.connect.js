const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

// this is syntax to connect to the database..

const initializeDatabase = () => {
    mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Database connected successfully.")
    })
    .catch((error) => {
        console.log("Error to connecting database.", error)
    })
}

module.exports = { initializeDatabase }
