const express = require("express")
const checkToken = require("../middleware/checkToken")
const validateBody = require("../middleware/validateBody")
const { placeAddJoi, Place, nearestPlaceJoi, nearestPlaceByCategoryJoi } = require("../models/Place")
const router = express.Router()

router.post("/", checkToken, validateBody(placeAddJoi), async (req, res) => {
  const { name, location, category } = req.body

  const place = new Place({
    name,
    location,
    category,
  })

  await place.save()

  res.json(place)
})

router.get("/", async (req, res) => {
  const places = await Place.find()
  res.json(places)
})

router.post("/nearestPlace", checkToken, validateBody(nearestPlaceJoi), async (req, res) => {
  const { lat, lon } = req.body

  const places = await Place.find()
  let minDistance = Infinity
  let nearestPlace

  places.forEach(place => {
    const a = Math.abs(lon - place.location.lon)
    const b = Math.abs(lat - place.location.lat)
    const distance = Math.sqrt(a ** 2 + b ** 2)
    if (distance < minDistance) {
      minDistance = distance
      nearestPlace = place
    }
  })

  res.send(nearestPlace)
})

router.post("/nearestPlaceByCategory", checkToken, validateBody(nearestPlaceByCategoryJoi), async (req, res) => {
  const { lat, lon, category } = req.body

  const places = await Place.find({ category })
  let minDistance = Infinity
  let nearestPlace

  places.forEach(place => {
    const a = Math.abs(lon - place.location.lon)
    const b = Math.abs(lat - place.location.lat)
    const distance = Math.sqrt(a ** 2 + b ** 2)
    if (distance < minDistance) {
      minDistance = distance
      nearestPlace = place
    }
  })

  if (!nearestPlace) return res.status(404).send("no place found")

  res.send(nearestPlace)
})

module.exports = router
