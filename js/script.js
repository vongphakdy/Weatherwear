// const fetch = require("node-fetch");
const zipForm = document.getElementById('zipForm');

zipForm.addEventListener('submit', (e) => {
    // TODO:    close form window > display main page
    //          form validation
    //          update fetch.catch
    //          update Temperature on HTML with innerHTML or innerText or someting
    e.preventDefault();
    apiCall();
})

function apiCall() {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const apiKey = '&appid=65c2a04c4c37cb19ae57a213f9dce232';
    let zipCode = 'zip=' + document.getElementById('zipCode').value; 
    let currTemp = document.getElementById('temp');
    // console.log(apiUrl + zipCode + apiKey);

    fetch(apiUrl + zipCode + apiKey)
        .then(response => response.json())
        .then(data => {
            let tempK = (data.main.temp).toFixed(0);
            let tempC = (tempK - 273.15).toFixed(0);
            let tempF = (((tempK - 273.15) * 1.8) + 32).toFixed(0);

            currTemp.innerHTML = tempF;
        })
        .catch(err => console.log(err));
}