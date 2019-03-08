import React from 'react';
import './styles/save_box.css';

function SavedBox(props) {
    return (
        <div className="savedWrapper">

            <div className="savedBox">
                <div className="savedBox-header">
                    <strong>Your Strains</strong>
                </div>
                <div className="savedBox-content">
                    {props.children}
                </div>

            </div>
        </div>
    )
}

export default SavedBox;