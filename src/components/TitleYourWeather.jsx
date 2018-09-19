import React from 'react';

const TitleYourWeather = props => (
    <div>
        
        {props.city && props.country && <h1 className="title">Weather in your city: {props.city} , {props.country}</h1>}
    </div>
)

export default TitleYourWeather;