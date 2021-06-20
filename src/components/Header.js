import React from 'react';
import { NavLink } from 'react-router-dom';

/*
 *  This component renders the Header of the API. 
 *  It is a stateless functional component that contains 'li' elements and React Router 'NavLink' elements that manages the URL routing.
 * 
 */

const Header = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/skylines">Skylines</NavLink></li>
                <li><NavLink to="/sunsets">Sunsets</NavLink></li>
                <li><NavLink to="/dogs">Dogs</NavLink></li>
            </ul>
        </nav>
    );    
}

export default Header;