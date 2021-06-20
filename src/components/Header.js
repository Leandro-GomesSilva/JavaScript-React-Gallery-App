import React from 'react';
import { NavLink } from 'react-router-dom';

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