const Joi = require("joi")
const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lon: Number,
  },
  category: {
    type: String,
    enum: ["Restaurant", "Hospital", "University", "Museum"],
  },
})

const placeAddJoi = Joi.object({
  name: Joi.string().min(1).max(1000).required(),
  location: Joi.object({
    lat: Joi.number().min(0).max(1000).required(),
    lon: Joi.number().min(0).max(1000).required(),
  }),
  category: Joi.string().valid("Restaurant", "Hospital", "University", "Museum").required(),
})

const nearestPlaceJoi = Joi.object({
  lat: Joi.number().min(0).max(1000).required(),
  lon: Joi.number().min(0).max(1000).required(),
})

const nearestPlaceByCategoryJoi = Joi.object({
  lat: Joi.number().min(0).max(1000).required(),
  lon: Joi.number().min(0).max(1000).required(),
  category: Joi.string().valid("Restaurant", "Hospital", "University", "Museum").required(),
})

const Place = mongoose.model("Place", placeSchema)

module.exports.Place = Place
module.exports.placeAddJoi = placeAddJoi
module.exports.nearestPlaceJoi = nearestPlaceJoi
module.exports.nearestPlaceByCategoryJoi = nearestPlaceByCategoryJoi
