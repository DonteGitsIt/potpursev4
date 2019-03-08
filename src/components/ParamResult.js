import React from 'react';
import './styles/result.css'

function ParamResult(props) {
    return (
        <div className="result">
            <h2>{props.name}</h2>
        </div>
    )
}

export default ParamResult;