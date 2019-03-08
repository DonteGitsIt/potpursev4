import React from 'react';
import './styles/search_box.css';




function SearchBox(props) {
    return (
        <div className="main_wrapper">

            <div className="box">
                <div className="box_header">
                    {props.header}
                </div>
                <form className="box_form">
                <div className="dropdown">
                        <button className="dropbtn" id="drop_btn" onClick= {(e) => e.preventDefault() }>
                            {props.buttonText === null ? "Search strains by..." : props.buttonText} <i className="arrow down"></i>
                        </button>
                        <div className="dropdown-content">
                            <div className="option" onClick={() => { props.handleParams("strain", "Search strains by strain name")}}>Strain name</div>
                            <div className="option" onClick={() => { props.handleParams("race", "Search strains by strain race")}}>Strain race(sativa, hybrid, indica)</div>
                            <div className="option" onClick={() => { props.handleParams("effect", "Search strains by strain effects")}}>Strain effects</div>
                            <div className="option" onClick={() => { props.handleParams("flavor", "Search strains by strain flavor")}}>Strain flavor</div>
                        </div>
                    </div>
                    {props.children}

                    
                </form>
            </div>
        </div>
    )
}

export default SearchBox;