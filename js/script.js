const settings = document.querySelector('.settings');
const zipForm = document.getElementById('zipForm');
const modal = document.querySelector('.modal');
let currTemp = document.getElementById('temp');
let hi = document.getElementById('hi');
let lo = document.getElementById('lo');
let humid = document.getElementById('humid');
let wearImg = document.getElementById('wearImg');
let wearBlurb = document.getElementById('wearBlurb');

let ctr = 0;
let clickCondition;
window.onload = (e) => {
    modal.style.display = 'block';
}
settings.addEventListener('click', (e) => {
    clickCondition = ctr++ % 2 === 0 ? modal.style.display='block' : modal.style.display='none';
})

zipForm.addEventListener('submit', (e) => {
    let zipCode = document.getElementById('zipCode').value; 
    let zipHead = document.getElementById('zipHead');

    e.preventDefault();
    zipHead.innerText = zipCode;
    apiCall();
    modal.style.display = 'none';
})

function apiCall() {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const apiKey = '&appid=65c2a04c4c37cb19ae57a213f9dce232';
    zipCode = 'zip=' + document.getElementById('zipCode').value; 

    fetch(apiUrl + zipCode + apiKey)
        .then(response => {
            if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong');
              }
        })
        .then(data => weatherOutput(data))
        .catch(err => error(err));
}

function error() {
    currTemp.innerHTML = '--';
    hi.innerHTML = '--';
    lo.innerHTML = '--';
    humid.innerHTML = '--';
    wearImg.src = 'img/wear-default.png';
    wearImg.alt = 'Error';
    wearBlurb.innerHTML = '<h1>Oops! Something went wrong.</h1><p>Double check your settings and try again.</p>';
}

function weatherOutput(data) {    
    let dayTemp = data.main.temp;
    let dayHi = data.main.temp_max;
    let dayLo = data.main.temp_min;
    let weather = data.weather[0].main;
    let radio = document.getElementById('radioF');
    
    // Alters Weather widget
    if (radio.checked) {
        currTemp.innerHTML = toF(dayTemp) + "&deg;";
        hi.innerHTML = toF(dayHi) + '&deg;';
        lo.innerHTML = toF(dayLo) + '&deg;';
        humid.innerHTML = data.main.humidity + '&#x25;'
    } else {
        currTemp.innerHTML = toC(dayTemp) + "&deg;";
        hi.innerHTML = toC(dayHi) + '&deg;';
        lo.innerHTML = toC(dayLo) + '&deg;';
        humid.innerHTML = data.main.humidity + '&#x25;'
    }
    
    //Alters Wear section
    if (weather == 'Thunderstorm' || weather == 'Squall') {
        wearImg.src = 'img/wear-thunder.png';
        wearImg.alt = 'Trench coat';
        wearBlurb.innerHTML = '<h1>Thunderstorm</h1><p>Wear a trench coat!</p>';
    } else if (weather == 'Rain' || weather == 'Drizzle') {
        wearImg.src = 'img/wear-rain.png';
        wearImg.alt = 'Rain coat';
        wearBlurb.innerHTML = '<h1>It&#x2019;s raining, it&#x2019;s pouring.</h1><p>Or there&#x2019;s just a slight drizzle. Either way, you should come equipped with an umbrella.</p>';
    } else if (weather == 'Snow') {
        wearImg.src = 'img/wear-snow.png';
        wearImg.alt = 'Snow coat';
        wearBlurb.innerHTML = '<h1></h1><p>Wear snow coar</p>';
    } else if (weather == 'Smoke' || weather == 'Haze' || weather == 'Dust' || weather == 'Sand' || weather == 'Ash') {
        wearImg.src = 'img/wear-smoke.png';
        wearImg.alt = 'Face mask';
        wearBlurb.innerHTML = '<h1>Unsafe atmospheric conditions.</h1><p>The air is filled with smoke, haze, dust, sand, or ash. Wear a face mask.</p>';
    } else if (weather == 'Tornado') {
        wearImg.src = 'img/wear-tornado.png';
        wearImg.alt = 'Tornado work';
        wearBlurb.innerHTML = '<h1>Tornado Warning!</h1><p>The outfit can wait! Check your local news stations for safety or evacuation updates.</p>';
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
        wearBlurb.innerHTML = '<h1>I&#x2019;m going ghost!</h1><p>That was a Danny Phantom reference... it&#x2019;s actually just misty. Wear a hoodie!</p>';
    }
}

function toF(tempX) {
    return (((tempX - 273.15) * 1.8) + 32).toFixed(0);
}
function toC(tempX) {
    return (tempX - 273.15).toFixed(0);
}