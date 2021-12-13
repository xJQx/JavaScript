const temperatureDescription = document.querySelector(".temperature-description");
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimeZone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature-section");
const temperatureSpan = document.querySelector(".temperature-section span");

let long;
let lat;

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
                    console.log(data);
                    const { temp, conditions, icon } = data.currentConditions;

                    // Set DOM Elements from the API
                    updateHTML(temp, conditions, data.timezone);

                    // temperature in celsius
                    let celsius = fahrenheitToCelsius(temp);

                    // getting icon for current weather type
                    setIcons(icon, document.querySelector(".icon"));

                    // switch temp between F and C
                    switchTemp(temp, celsius);
                })
        });
    }
})

// updating html
function updateHTML (temp, conditions, timezone) {
    temperatureDegree.textContent = temp;
    temperatureDescription.textContent = conditions;
    locationTimeZone.textContent = timezone;
    temperatureSpan.textContent = "F";
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
    temperatureSection.addEventListener("click", () => {
        if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = celsius.toFixed(1);;
        } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = fehreheit;
        }
    })
}

// convert temp from fahrenheit to celsius
function fahrenheitToCelsius(temp) {
    return (temp - 32) * (5 / 9);
}