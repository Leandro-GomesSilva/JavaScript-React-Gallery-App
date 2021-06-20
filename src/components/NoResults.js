import React from 'react';

/*
 *  This component renders the 'No Results Found' message. 
 *  It is a stateless functional component.
 * 
 */

const NoResults = () => {
    return (
        <ul>
            <li className="not-found">
                <h3>No Results Found</h3>
                <p>Your search did not return any results. Please try another term.</p>
            </li>
        </ul>
    );
}

export default NoResults;