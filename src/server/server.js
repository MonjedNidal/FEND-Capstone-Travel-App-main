import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();
const dataStore = {};

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("dist"));

const PORT = 8081;
server.listen(PORT, () => console.log(`Server is up on port ${PORT}`));

server.get("/all", (req, res) => res.send(dataStore));

server.post("/add", (req, res) => {
  const {
    temperature,
    date,
    feel,
    city,
    country,
    latitude,
    longitude,
    weather,
    imageUrl,
  } = req.body;
  Object.assign(dataStore, {
    temperature,
    date,
    feel,
    city,
    country,
    latitude,
    longitude,
    weather,
    imageUrl,
  });
  res.send(dataStore);
});

server.post("/api/geonames", async (req, res) => {
  const { city } = req.body;
  const username = process.env.GEONAMES_USERNAME;
  const endpoint = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;

  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    console.log("Geonames Response:", result);

    result.geonames?.length
      ? res.json(result.geonames[0])
      : res.status(404).json({ message: "No results found" });
  } catch (err) {
    console.error("Geonames API Error:", err);
    res
      .status(500)
      .json({ message: "Error retrieving data from Geonames API" });
  }
});

server.post("/api/weatherbit", async (req, res) => {
  const { lat, lon } = req.body;
  const apiKey = process.env.WEATHERBIT_API_KEY;
  const endpoint = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("Weatherbit API Error:", err);
    res
      .status(500)
      .json({ message: "Error retrieving data from Weatherbit API" });
  }
});

server.post("/api/pixabay", async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.PIXABAY_API_KEY;
  const endpoint = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&image_type=photo`;

  try {
    const response = await fetch(endpoint);
    const rawData = await response.text();
    const result = JSON.parse(rawData);

    result.hits?.length
      ? res.json(result.hits[0])
      : res.status(404).json({ message: "No images found" });
  } catch (err) {
    console.error("Pixabay API Error:", err);
    res.status(500).json({ message: "Error retrieving data from Pixabay API" });
  }
});

export default server;
