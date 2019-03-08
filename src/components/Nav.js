
import { Link } from "react-router-dom";
import React from 'react';


import './styles/nav.css'


 

    const Nav = props => {
    return (
        <nav id="navigation">
            
            <ul className="navList">

                    <li>
                    <Link to="/" className="navItem">Search</Link>
                    </li>
                    
                    <li>
                    <Link to="/saved" className="navItem">Saved Strains</Link>
                    </li>
                    
                    <li>
                    <span id="logout" className="navItem" onClick={props.logout}>Logout</span>
                    </li>
            </ul>
        </nav>
    )
}

export default Nav;