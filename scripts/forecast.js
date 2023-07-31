const api = 'b0fc24c59e154796a0484248233107';

//get city
const getCity = async (city) => {
  const base = 'https://api.weatherapi.com/v1/search.json';
  const query = `?key=${api}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0]; 
};

//get Weather
const getWeather = async (cityName) => {
  const base = 'https://api.weatherapi.com/v1/current.json';
  const query = `?key=${api}&q=${cityName}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data.current; 
};
