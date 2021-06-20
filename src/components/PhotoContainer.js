import React from 'react';
import Photo from './Photo'

const PhotoContainer = (props) => {
    
    const data = props.data;
    let photos = data.map( (photo) => {
        return <Photo id={photo.id} server={photo.server} secret={photo.secret} title={photo.title} key={photo.id}/> 
    });

    return (
        <div className="photo-container">
            <h2> 
              {`Results - ${props.category}`}
            </h2>
            <ul>
                { photos }
            </ul>
        </div>
    );    
}

export default PhotoContainer;     