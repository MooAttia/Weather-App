"strict mode"
let todayLocation = document.querySelector(".TodayLocation");
let todayTemp = document.querySelector(".TodayTemp");
let todayIcon = document.querySelector(".todayIcon");
let todayDescription = document.querySelector(".description");
let todayHumidity = document.querySelector(".todayHumidity");
let todayWind = document.querySelector(".todayWind");
let todaydirection = document.querySelector(".todaydirection");
let tomImage = document.querySelector(".tomImage");
let tomHighDegree = document.querySelector(".tomHighDegree");
let tomLowDegree = document.querySelector(".tomLowDegree");
let tomDescription = document.querySelector(".tomDescription");
let afterImage = document.querySelector(".afterImage");
let afterHighDegree = document.querySelector(".afterHighDegree");
let afterLowDegree = document.querySelector(".afterLowDegree");
let afterDescription = document.querySelector(".afterDescription");
let dayName = document.querySelector(".dayName");
let date = document.querySelector(".date")
let month = document.querySelector(".month")
let tomDay = document.querySelector(".tomDay")
let afterDay = document.querySelector(".afterDay")
let search = document.querySelector(".search")






async function getData(city)
{
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=02e27fabcce14f8ab3881349241907&q=${city}&days=3`);
    let data = await response.json();
    return data;
}

async function main(city = "Giza")
{
    let wetherData = await getData(city);
    displayToday(wetherData);
    displayTomorrow(wetherData);
    displayAfter(wetherData);
}
main();
function displayToday(data)
{
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c + "°C";
    todayIcon.setAttribute("src",data.current.condition.icon);
    todayDescription.innerHTML = data.current.condition.text;
    todayHumidity.innerHTML = data.current.humidity + "%";
    todayWind.innerHTML = data.current.wind_kph + "km/h";
    todaydirection.innerHTML = data.current.wind_dir;
    let todayName = new Date()
    dayName.innerHTML = todayName.toLocaleString("en-us",{weekday: "long"})
    date.innerHTML = todayName.getDate()
    month.innerHTML = todayName.toLocaleDateString("en-us" , {month:"long"})
}
function displayTomorrow(data)
{
    let forcData = data.forecast.forecastday;
    tomImage.setAttribute("src",data.forecast.forecastday[1].day.condition.icon);
    tomHighDegree.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + "°C";
    tomLowDegree.innerHTML = data.forecast.forecastday[1].day.mintemp_c + "°C";
    tomDescription.innerHTML = data.forecast.forecastday[1].day.condition.text;
    let todayName = new Date(forcData[1].date)
    tomDay.innerHTML = todayName.toLocaleString("en-us",{weekday: "long"})
}
function displayAfter(data)
{
    let forcData = data.forecast.forecastday;
    afterImage.setAttribute("src",data.forecast.forecastday[2].day.condition.icon);
    afterHighDegree.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + "°C";
    afterLowDegree.innerHTML = data.forecast.forecastday[2].day.mintemp_c + "°C";
    afterDescription.innerHTML = data.forecast.forecastday[2].day.condition.text;
    let todayName = new Date(forcData[2].date)
    afterDay.innerHTML = todayName.toLocaleString("en-us",{weekday: "long"})
}

search.addEventListener("input",function(){
    main(search.value)
})