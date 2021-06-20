import React from 'react';
import { Route } from 'react-router-dom';

import Photo from './Photo'
import NoResults from './NoResults';

const PhotoContainer = ( props ) => {
    
    const data = props.data;
    let photos = data.map( (photo) => {
        return <Photo id={photo.id} server={photo.server} secret={photo.secret} title={photo.title} key={photo.id}/> 
    });

    console.log(props.data.length);

    if (data.length !== 0) {
        return (
            <div className="photo-container">
                <h2> 
                  {props.category.length !== 0 ? `Results - ${props.category}` :`Results - ${props.query}` }
                </h2>
                <ul>
                    { photos }
                </ul>
            </div>
        );    
    }   else {
        return (
            <Route component={NoResults} />
        )
    }
}

export default PhotoContainer;     