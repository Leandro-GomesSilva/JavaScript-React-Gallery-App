import React from 'react';
import { NavLink } from 'react-router-dom';

/*
 *  This component renders the '404 Not Found' message, in case no match between URL and Routes is found.
 *  It is a stateless functional component.
 * 
 */

const NotFound = () => {
    return (
        <ul>
            <li className="not-found">
                <h3>404 - Page Not Found</h3>
                <p>The Page your search do not exist. Click the link below to return to the Home Page.</p>
                <NavLink to="/skylines">Home</NavLink>
            </li>
        </ul>
    );
}

export default NotFound;