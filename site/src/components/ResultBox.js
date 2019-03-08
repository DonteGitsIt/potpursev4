import React from 'react';
import './styles/result_box.css';

function ResultBox(props) {
    return (
        <div className="mainWrapper">

            <div className="resultBox">
                <div className="resultBox-header">
                    <strong id="return" onClick={props.script}>Back to search</strong>
                </div>
                <div className="resultBox-content">
                    {props.children}
                </div>

            </div>
        </div>
    )
}

export default ResultBox;