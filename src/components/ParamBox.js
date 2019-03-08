import React from 'react';
import './styles/save_box.css';

function ParamBox(props) {
    return (
        <div className="savedWrapper">

            <div className="savedBox">
                <div className="paramBox-header">
                    <strong id="return" onClick={props.script}>Back to search</strong>
                    <strong>{props.header}</strong>
                </div>
                <div className="savedBox-content">
                    {props.children}
                </div>

            </div>
        </div>
    )
}

export default ParamBox;