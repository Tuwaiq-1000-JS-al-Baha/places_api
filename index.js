const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const Joi = require("joi")
const JoiObjectId = require("joi-objectid")
Joi.objectid = JoiObjectId(Joi)
const users = require("./routes/users")
const places = require("./routes/places")

mongoose
  .connect(
    `mongodb+srv://user8465z:${process.env.MONGODB_PASSWORD}@cluster0.oxi8g.mongodb.net/placesDB?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Error connecting to MongoDB", error))

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", users)
app.use("/api/places", places)

const port = 5000

app.listen(port, () => console.log("Server is listening on port " + port))
