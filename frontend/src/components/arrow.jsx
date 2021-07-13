import React from 'react';
import "./arrow.css"
import downArrow from '../downArrow.svg';
function Arrow(props) {
    
    return (
        <button className="arrow__icon__container">
            <span className="arrow__text">{props.arrowText}</span>
            <img className="arrow__icon" src={downArrow} alt="A downwards pointing arrow" />
        </button>
    )
}

export default Arrow;