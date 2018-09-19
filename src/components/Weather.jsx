import React from 'react';

const Weather = props => (
    <div>
        {props.city && props.country && <div>Location: {props.city} , {props.country}</div>}
        {props.temperature && <p>Temperature: {props.temperature} &deg;C</p> }
        {props.humidity && <p>Humidity: {props.humidity} %</p>}
        {props.description && <p>Conditions: {props.description}</p>}
        {props.wind && <p>Wind: {props.wind} m/s</p>}
        {props.error && <p>{props.error}</p>}
    </div>
)


export default Weather;