import React from 'react';
import './styles/result.css'

function SavedResult(props) {
    return (
        <div className="result">
            <h2>{props.name}</h2>

            <h4>Race: {props.race}</h4>

            <h4>{props.description}</h4>

            
            <p>-----------------------------------------------------------------</p>
        </div>
    )
}

export default SavedResult;