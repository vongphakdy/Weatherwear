// const fetch = require("node-fetch");
const zipForm = document.getElementById('zipForm');

zipForm.addEventListener('submit', (e) => {
    // TODO:    close form window > display main page
    //          form validation
    //          update fetch.catch to display err on screen !console.log
    e.preventDefault();
    apiCall();
})

function apiCall() {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const apiKey = '&appid=65c2a04c4c37cb19ae57a213f9dce232';
    let zipCode = 'zip=' + document.getElementById('zipCode').value; 
    let currTemp = document.getElementById('temp');
    let hi = document.getElementById('hi');
    let lo = document.getElementById('lo');
    let humid = document.getElementById('humid');
    // console.log(apiUrl + zipCode + apiKey);

    fetch(apiUrl + zipCode + apiKey)
        .then(response => {
            if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong');
              }
        })
        .then(data => {
            let dayTemp = toF(data.main.temp);
            let dayHi = toF(data.main.temp_max);
            let dayLo = toF(data.main.temp_min);

            currTemp.innerHTML = dayTemp + "&deg;";
            hi.innerHTML = dayHi + '&deg;';
            lo.innerHTML = dayLo + '&deg;';
            humid.innerHTML = data.main.humidity + '&#x25;'
        })
        .catch(err => console.log(err));
}

function toF(tempX) {
    return (((tempX - 273.15) * 1.8) + 32).toFixed(0);
}
function toC(tempX) {
    return (tempX - 273.15).toFixed(0);
}