import React from 'react';
import './styles/result.css'

function Result(props) {
    return (
        <div className="result">
            <h2>{props.name}</h2>

            <h4>Race: {props.race}</h4>

            <h4>{props.description === null ? "No description found" : props.description}</h4>

            <button className="saveBtn" value={props.name} onClick={() => {props.save(props.name)}}>Save</button>
            <p>-----------------------------------------------------------------</p>
        </div>
    )
}

export default Result;