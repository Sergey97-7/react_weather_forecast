import React, { Component } from 'react';
import './index.css';
import TitleWeatherFinder from './components/TitleWeatherFinder';
import Form from './components/Form';
import Weather from './components/Weather';
import TitleYourWeather from './components/TitleYourWeather';

const API_KEY = '83217a0609c064c6634873d71e34850f';
const heroku = 'https://cors-anywhere.herokuapp.com/';

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    wind: undefined,
    error: undefined,

    myCity: undefined,
    myCountry: undefined,
    myTemperature: undefined,
    myHumidity: undefined,
    myDescription: undefined,
    myWind: undefined,
    myError: undefined
  }
  componentDidMount() {
    this.fetchIP();
  }
  fetchIP = (response) => {
    fetch(`${heroku}//api.ipstack.com/check?access_key=afce5a242eba13b5763884eb204d50fa`)
      .then(response =>response.json())
      .then(({city, country_code}) => this.getYourWeather(city, country_code))
      .catch(error => console.error(error));
  }
  getYourWeather = (city, country) => {
    fetch(`${heroku}//api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          myCity: data.name,
          myCountry: data.sys.country,
          myTemperature: data.main.temp,
          myHumidity: data.main.humidity,
          myDescription: data.weather[0].description,
          myWind: data.wind.speed,
          myError: ''
        }) 
      })
      .catch(error => console.error(error));
      
  }
   getWeather = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    fetch(`${heroku}//api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY}`)
    .then (response => response.json())
    .then (data => {
      if (city && country && data.cod === "404") {
        this.setState({
          city: undefined,
          country: undefined,
          temperature: undefined,
          humidity: undefined,
          description: undefined,
          wind: undefined,
          error: "Error 404! City and Country not found"
        });
      }
      else if (city && country) {
        this.setState({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          wind: data.wind.speed,
          error: ""
        });
      }
      else {
        this.setState({
          city: undefined,
          country: undefined,
          temperature: undefined,
          humidity: undefined,
          description: undefined,
          wind: undefined,
          error: "Please enter City and Country"
        });
      }
    })  
   } 
  render() {
    return (
     <div>
       <div className="container">
          <div className="container__element container__your-weather">
            <div className="container__main">
              <TitleYourWeather 
                city = {this.state.myCity}
                country = {this.state.myCountry}
              />
            
              <Weather 
                temperature = {this.state.myTemperature}
                humidity = {this.state.myHumidity}
                description = {this.state.myDescription}
                wind = {this.state.myWind}
                error = {this.state.myError}
              />
            </div>
          </div>
          <div className="container__element container__search-weather">
            <div className="container__main">
              <TitleWeatherFinder />
              <Form getWeather={this.getWeather}/>
            </div>
            <div className="container__weather-forecast">
              <Weather 
                city = {this.state.city}
                country = {this.state.country}
                temperature = {this.state.temperature}
                humidity = {this.state.humidity}
                description = {this.state.description}
                wind = {this.state.wind}
                error = {this.state.error}
              />
            </div>
          </div>
       </div>  
     </div>
    );
  }
}

export default App;
