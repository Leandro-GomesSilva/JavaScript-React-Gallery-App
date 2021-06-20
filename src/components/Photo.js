import React from 'react';

/*
 *  This component renders one photo/picture element.
 *  It is a stateless functional component. 
 *  Data relative to each single picture is passed to it via props from the PhotoContainer component.
 * 
 */

const Photo = (props) => {
    return (
        <li>
            <img src={`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`} alt={props.title} />
        </li>
    );    
}

export default Photo;     