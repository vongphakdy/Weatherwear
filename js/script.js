const fetch = require("node-fetch");

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London';
let apiKey = '&appid=65c2a04c4c37cb19ae57a213f9dce232';


fetch(apiUrl + apiKey)
    .then(response => response.json())
    .then(data => {
        // const yolo = JSON.parse(data);
        console.log(data.weather[0].main);
    })
    .catch(err => console.log(err));