import React from 'react';

const Form = props => (
    <form className="form" onSubmit={props.getWeather}>
    <div className="form__inputs">
        <input className="form__input" type="text" name="city" placeholder="City" />
        <input className="form__input" type="text"name="country" placeholder="Country"/>
    </div>
        <button className="form__btn">Get Forecast</button>
    </form>
)


export default Form;