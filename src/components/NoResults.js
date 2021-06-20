import React from 'react';

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