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
    let wearImg = document.getElementById('wearImg');
    let wearBlurb = document.getElementById('wearBlurb');

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
            let weather = data.weather[0].main;
            
            // Alters Weather widget
            currTemp.innerHTML = dayTemp + "&deg;";
            hi.innerHTML = dayHi + '&deg;';
            lo.innerHTML = dayLo + '&deg;';
            humid.innerHTML = data.main.humidity + '&#x25;'
            
            //Alters Wear section
            if (weather == 'Thunderstorm' || weather == 'Squall') {
                wearImg.src = 'img/wear-thunder.png';
                wearImg.alt = 'Trench coat';
                wearBlurb.innerHTML = '<h1>Thunder</h1><p>Wear trench coat</p>';
            } else if (weather == 'Rain' || weather == 'Drizzle') {
                wearImg.src = 'img/wear-rain.png';
                wearImg.alt = 'Rain coat';
                wearBlurb.innerHTML = '<h1>Rain</h1><p>Wear rain coat</p>';
            } else if (weather == 'Snow') {
                wearImg.src = 'img/wear-snow.png';
                wearImg.alt = 'Snow coat';
                wearBlurb.innerHTML = '<h1>Snow</h1><p>Wear snow coar</p>';
            } else if (weather == 'Smoke' || weather == 'Haze' || weather == 'Dust' || weather == 'Sand' || weather == 'Ash') {
                wearImg.src = 'img/wear-smoke.png';
                wearImg.alt = 'Face mask';
                wearBlurb.innerHTML = '<h1>Smoke</h1><p>Face mask</p>';
            } else if (weather == 'Tornado') {
                wearImg.src = 'img/wear-tornado.png';
                wearImg.alt = 'Tornado work';
                wearBlurb.innerHTML = '<h1>Tornado</h1><p>Contact local news</p>';
            } else if (weather == 'Clear') {
                wearImg.src = 'img/wear-clear.png';
                wearImg.alt = 'T-shirt';
                wearBlurb.innerHTML = '<h1>Suns Out. Guns out.</h1><p>It&#x2019;s clear out today. Throw on your favorite T-shirt and soak up the sun!</p>'
            } else if(weather == 'Clouds' || weather == 'Fog') {
                wearImg.src = 'img/wear-cloud.png';
                wearImg.alt = 'Long sleeve';
                wearBlurb.innerHTML = '<h1>"That one looks like a rabbit!"</h1><p>Cloudy skies up above. Go outside and see if you can make out any shapes &#x2014; but don&#x2019;t forget to put on a long sleeve!</p>';
            }  else if(weather == 'Mist') {
                wearImg.src = 'img/wear-mist.png';
                wearImg.alt = 'Hoodie';
                wearBlurb.innerHTML = '<h1>Mist</h1><p>Misty</p>';
            }
        })
        .catch(err => console.log(err));
}

function toF(tempX) {
    return (((tempX - 273.15) * 1.8) + 32).toFixed(0);
}
function toC(tempX) {
    return (tempX - 273.15).toFixed(0);
}