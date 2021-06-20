// Importing React related libraries and objects
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Importing components
import Photo from './Photo'
import NoResults from './NoResults';

/*
 *  PhotoContainer Component
 *  This is a class component. It renders the Photo Container by mapping the data array (received via props) with map, 
 *  building the corresponding 'photos array' with Photo Components (using the Photo Component) and rendering the 'photos array'.
 *  In case no photo/picture is in the data array, it will return a Route that points to the 'NoResults' component.
 * 
 */

class PhotoContainer extends Component {
    
    // In case there is a deviation between the query array and the search tag after the component mounts, the data needs to be re-fetched.
    componentDidMount() {
        if (this.props.searchTag !== this.props.query ) {
            this.props.reFetchData(this.props.query, false);
        }
    }

    // If the component updates (e.g. by navigating back and forth between two different search terms) the data needs to be re-fetched with the current URL query term (/:query).
    componentDidUpdate() {
        this.props.reFetchData(this.props.query, false);
    }

    render() {
        const data = this.props.data;

        // Creates an array of Photo Components
        let photos = data.map( (photo) => {
            return <Photo id={photo.id} server={photo.server} secret={photo.secret} title={photo.title} key={photo.id}/> 
        });

        // Renders the Photo-Container witrh the array of Photo Components or render 'NoResults'
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