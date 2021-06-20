import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Photo from './Photo'
import NoResults from './NoResults';

class PhotoContainer extends Component {
    
    componentDidMount() {
        if (this.props.query && this.props.searchTag !== this.props.query ) {
            this.props.reFetchData(this.props.query, false);
        }
    }

    componentDidUpdate() {
        this.props.reFetchData(this.props.query, false);
    }

    render() {
        const data = this.props.data;
        let photos = data.map( (photo) => {
            return <Photo id={photo.id} server={photo.server} secret={photo.secret} title={photo.title} key={photo.id}/> 
        });

        if (data.length !== 0) {
            return (
                <div className="photo-container">
                    <h2> 
                    {this.props.category.length !== 0 ? `Results - ${this.props.category}` :`Results - ${this.props.query}` }
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
}

export default PhotoContainer;     