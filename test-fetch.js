const fetch = require("node-fetch");

fetch("https://dragon-city-api.onrender.com")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
