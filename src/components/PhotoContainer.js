import React from 'react';
import Photo from './Photo'

const PhotoContainer = (props) => {
    
    return (
        <div className="photo-container">
          <h2>{`Results - ${props.category}`}</h2>
          <Photo />
          </div>
    );    
}

export default PhotoContainer;     