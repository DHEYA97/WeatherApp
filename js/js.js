const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

let weatherSearch = document.getElementById("weatherSearch")
let weatherTable = document.querySelector(".weather-table")
weatherSearch.addEventListener('keyup',(a)=>{
   weatherAPI(a.target.value)
})

async function weatherAPI(city = 'Riyadh')
{
    var http = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=511ec218ac904fb2907183312230608&q=${city}&days=3`)
    if(http.ok && http.status == 200)
    {
        let weatherList  = await http.json()
        await weatherInfo(weatherList.location,weatherList.forecast.forecastday)    
    }
    else
    {
      console.log('error connection')
    }
    
}

weatherAPI()

async function weatherInfo(location,forecastday)
{
  let t = ''  
  for(let i = 0 ;i< forecastday.length ; i++)
    {
        t+=
        `
        <div class="col-lg-4">
                        <div class="layer1">
                            <div class="weather-date1 d-flex justify-content-between align-items-center p-2">
                                <p class="day ms-2">${days[new Date(forecastday[i].date).getDay()]}</p>
                                <p class="date me-2">${new Date(forecastday[i].date).getDate()}August</p>
                            </div>
                            <div class="weather-info-body mt-5 ps-4">
                                <p class="governorate fs-4">${location.name}</p>
                                <div class="mb-3 d-flex justify-content-evenly align-items-center">
                                    <h2 class="temperature">${forecastday[i].day.maxtemp_c}</h2>
                                    <img src="${forecastday[i].day.condition.icon}" class="w-25" alt="icon"/>
                                </div>
                                <h3 class="mb-4 text-white ms-5 fw-lighter">${forecastday[i].day.mintemp_c}</h3>
                                <p class="status mb-4">${forecastday[i].day.condition.text}</p>
                                <div class="d-flex justify-content-evenly align-items-center">
                                    <div class="d-flex justify-content-evenly align-items-start mb-3">
                                        <img src="image/4.png" class="w-25" alt="sunny"/>
                                        <p class="degree">20%</p>
                                    </div>
                                    <div class="d-flex justify-content-evenly align-items-start mb-3">
                                        <img src="image/2.png" class="w-25" alt="sunny"/>
                                        <p class="degree">18km/h</p>
                                    </div>
                                    <div class="d-flex justify-content-evenly align-items-start mb-3">
                                        <img src="image/1.png" class="w-25" alt="sunny"/>
                                        <p class="degree">East</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    }
    weatherTable.innerHTML = t
    let layer = document.querySelectorAll('.layer1')
    let weatherDate = document.querySelectorAll('.weather-date1') 
    layer[1].classList.replace('layer1','layer2');
    layer[2].classList.replace('layer1','layer3');
    weatherDate[1].classList.replace('weather-date1','weather-date2');
    weatherDate[2].classList.replace('weather-date1','weather-date3');

}