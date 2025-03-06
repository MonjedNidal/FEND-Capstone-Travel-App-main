const tripDetails = {
  city: "",
  date: "",
  country: "",
  lat: "",
  lon: "",
  weather: "",
  image: "",
};

// Handles form submission
async function processForm(event) {
  event.preventDefault();

  const cityInput = document.getElementById("city").value;
  const tripDate = document.getElementById("date").value;

  try {
    console.log("Fetching location data...");
    const geoRes = await fetch("/api/geonames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: cityInput }),
    });

    if (!geoRes.ok) throw new Error("Failed to retrieve location data.");
    const geoInfo = await geoRes.json();
    console.log("Location Info:", geoInfo);

    const { lat, lng, countryName } = geoInfo;

    // Store Geonames data
    Object.assign(tripDetails, {
      city: cityInput,
      date: tripDate,
      country: countryName,
      lat,
      lon: lng,
    });

    // Fetch weather data
    console.log("Fetching weather data...");
    const weatherRes = await fetch("/api/weatherbit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lon: lng }),
    });

    if (!weatherRes.ok) throw new Error("Failed to retrieve weather data.");
    const weatherInfo = await weatherRes.json();
    tripDetails.weather = weatherInfo.data[0].weather.description;

    // Fetch city image
    console.log("Fetching city image...");
    const imageRes = await fetch("/api/pixabay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: cityInput }),
    });

    if (!imageRes.ok) throw new Error("Failed to retrieve image.");
    const imageInfo = await imageRes.json();
    tripDetails.image = imageInfo.webformatURL;

    // Update UI
    document.getElementById("results").innerHTML = `
      <h2>Trip to ${cityInput}, ${countryName} on ${tripDate}</h2>
      <p>Coordinates: ${lat}, ${lng}</p>
      <p>Weather: ${tripDetails.weather}</p>
      <img src="${tripDetails.image}" alt="${cityInput}">
      <button id="remove-trip" class="btn btn-danger">Remove Trip</button>
    `;

    // Attach event listener to remove button
    const removeBtn = document.getElementById("remove-trip");
    if (removeBtn) removeBtn.addEventListener("click", clearTrip);
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("results").innerHTML = `Error: ${err.message}`;
  }
}

// Clears trip data
function clearTrip() {
  Object.keys(tripDetails).forEach((key) => (tripDetails[key] = ""));

  document.getElementById("results").innerHTML = "";
}

export { processForm, tripDetails };
