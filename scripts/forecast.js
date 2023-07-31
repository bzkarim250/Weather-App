const api='KPfITJsiq6plzZHduezz8aJtQ7qqqy0Z';

//get city
const getCity=async (city)=>{
    const base='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query=`?apikey=${api}&q=${city}`;
    const response=await fetch(base+query);
    const data=await response.json();
    return data[0];
}

//get Weather
const getWeather=async(id)=>{
    const base='http://dataservice.accuweather.com/currentconditions/v1/';
    const query=`${id}?apikey=${api}`;
    const response=await fetch(base+query);
    const data=await response.json();
    return data[0];
}
