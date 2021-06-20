import React from 'react';

const Photo = (props) => {
    console.log(props.owner, props.id);
    return (
        <li>
            <img src={`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`} alt={props.title} />
        </li>
    );    
}

export default Photo;     