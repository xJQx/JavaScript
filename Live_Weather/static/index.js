const temperatureDescription = document.querySelector(".temperature-description");
const temperatureDegree = document.querySelector(".temperature-degree");
const locationDiv = document.querySelector(".location");
const locationTimeZone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature-section");
const temperatureSpan = document.querySelector(".temperature-section span");
const weatherIcon = document.querySelector(".icon");
const temperatureForecast = document.querySelector(".forecast-button");
const forecastButton = document.querySelector(".btn-2");
const forecastText = document.querySelector(".forecast");
const forecastTimezone = document.querySelector(`#forecast-timezone`);

const CURRENT = [temperatureDegree
                ,temperatureDescription
                ,locationTimeZone
                ,weatherIcon
                ,forecastTimezone];

let long;
let lat;

let API_DATA;

window.addEventListener('load', () => {
    // ask user for geolocation with popup
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=7AP785FRJYLF8LC8KPMV36CMP`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    API_DATA = data;
                    [fehreheit, celsius] = showCurrent(API_DATA);

                    temperatureSection.addEventListener("click", () => {
                        switchTemp(fehreheit, celsius);
                    })

                    // event listener for forecast button
                    forecastButton.addEventListener("click", () => {
                        forecastTemperature();
                    });
                })
        });
    }
})

// show current weather conditions
function showCurrent(data) {
    // hide forecast
    forecastText.setAttribute("style", "display: none");
    forecastTimezone.setAttribute("style", "display: none");

    // api data
    console.log(data);
    const { temp, conditions, icon } = data.currentConditions;

    // Set DOM Elements from the API
    updateHTML(temp, conditions, data.timezone);

    // temperature in celsius
    let celsius = fahrenheitToCelsius(temp);

    // getting icon for current weather type
    setIcons(icon, document.querySelector(".icon"));

    return [temp, celsius];
}


// updating html
function updateHTML (temp, conditions, timezone) {
    temperatureDegree.textContent = temp;
    temperatureDescription.textContent = conditions;
    locationTimeZone.textContent = timezone;
    temperatureSpan.textContent = "F";
    
    temperatureSection.setAttribute("style", "display: block");
    locationDiv.setAttribute("style", "display: block-inline");
    weatherIcon.setAttribute("style", "display: block");
    temperatureForecast.setAttribute("style", "display: block");
}

// getting icon for current weather type
function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

// switch temp between F and C
function switchTemp(fehreheit, celsius) {
    if (temperatureSpan.textContent === "F") {
        temperatureSpan.textContent = "C";
        temperatureDegree.textContent = celsius.toFixed(1);;
    } else {
        temperatureSpan.textContent = "F";
        temperatureDegree.textContent = fehreheit;
    }
}

// convert temp from fahrenheit to celsius
function fahrenheitToCelsius(temp) {
    return (temp - 32) * (5 / 9);
}

// forecast temperature
function forecastTemperature() {
    // forecast and current button
    if (forecastButton.innerHTML == "forecast") {
        // console.log("forecast");
        // show forecast and change button name
        showForecast(API_DATA);
        forecastButton.innerHTML = "current";

    } else {
        // console.log("current");
        // show current weather conditions and change name
        showCurrent(API_DATA);
        forecastButton.innerHTML = "forecast";
    }
    
}

// clearing HTML
function clearHTML () {
    // clearing current
    CURRENT.forEach((div) => {
        div.textContent = "";
    });
    // clearing forecast
    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#f${i}`).innerHTML = ""
    }

    // hiding div
    locationDiv.setAttribute("style", "display: none");
    temperatureSection.setAttribute("style", "display: none");
    weatherIcon.setAttribute("style", "display: none");
    forecastTimezone.setAttribute("style", "display: none");
}

// show forecast
function showForecast(data) {
    // clear HTML
    clearHTML();

    // show forecast
    forecastText.setAttribute("style", "display: flex");
    forecastTimezone.setAttribute("style", "display: block");

    const DAYS = data.days;
    console.log(DAYS);
    
    // header for forecast section
    forecastTimezone.innerHTML = data.timezone;

    // for each day (5 days)
    for (let i = 1; i <= 5; i++) {
        const { temp, conditions, icon, datetime } = DAYS[i];
        let day = document.querySelector(`#f${i}`);

        // day inner HTML 
        day.innerHTML = `<span>
                            <span style="font-size: 25px;">${temp}</span>
                            <span>F</span><br>
                        </span>
                        <span>${conditions}</span><br>
                        <canvas style="margin-top: 3px;" id="c${i}" width=30 height=30></canvas>
                        <span style="font-size: 15px; color: lightgrey; left-margin: 3px;">${datetime}</span>`
        
        // getting icon for forecast weather type
        setIcons(icon, document.querySelector(`#c${i}`));
    }
    
}