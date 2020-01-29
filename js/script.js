const fetch = require("node-fetch");

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London';
let apiKey = '&appid=65c2a04c4c37cb19ae57a213f9dce232';


fetch(apiUrl + apiKey)
    .then(response => response.json())
    .then(data => {
        const condition = data.weather[0].main;
        if (condition == "Thunderstorm") {
            console.log("Heavy coat + umbrella");
        } else if (condition == "Drizzle" || condition == "Rain") {
            console.log("Sweater + umbrella");
        } else if (condition == "Snow") {
            console.log("Snow coat");
        } else if (condition == "Smoke" || condition == "Dust" || condition == "Sand" || condition == "Ash") {
            console.log("Face mask");
        } else if (condition == "Clear") {
            console.log("T shirt");
        } else if (condition == "Clouds") {
            console.log("Long sleeve");
        } else {
            console.log("Figure dis out");
        }
    })
    .catch(err => console.log(err));