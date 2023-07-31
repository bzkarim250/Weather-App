//DOM manupilation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const loading = document.querySelector('.loading');

const updateUI = (data) => {
  // Destructure properties
  const { cityDets, weather } = data;

  // Update template details
  details.innerHTML = `
      <div class="details">
          <h5>${cityDets.name}</h5>
          <div>${weather.condition.text}</div>
          <div>
              <span>${weather.temp_c}</span>
              <span>&deg;C</span>
          </div>
      </div>
  `;

  // Update day/night img & icons
  const iconSrc = `https:${weather.condition.icon}`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  timeSrc = weather.is_day ? './img/day.jpg' : './img/night.jpg';
  time.setAttribute('src', timeSrc);

  // Show the card and hide the loading indicator (data is available at this point)
  card.classList.remove('d-none');
  loading.classList.add('d-none');
};

const updateCity = async (city) => {
  // Show the loading indicator while fetching data
  loading.classList.remove('d-none');
  card.classList.add('d-none'); // Hide the card while loading

  try {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.name);

    // Using Short hand object notation
    const data = { cityDets, weather };
    updateUI(data);
  } catch (err) {
    console.log(err);
  }
};
cityForm.addEventListener('submit',e=>{
    //prevent default action
    e.preventDefault();
    //get city
    const city=cityForm.city.value.trim();
     //clear the form
    cityForm.reset()
    //update UI with city
    updateCity(city)
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));

    //storing data to local storage
    localStorage.setItem('city',city);
});

//checking the city from local storage
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
                            .then(data=>updateUI(data))
                            .catch(err=>console.log(err));
}
