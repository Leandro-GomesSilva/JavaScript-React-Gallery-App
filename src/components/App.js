import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../css/App.css';
import apiKey from '../config';

// App components
import SearchForm from './SearchForm';
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';

class App extends Component {
   
  state = {
    photos: []
  }

  // When the component mount, the API data will be fetched using the Fetch API.
  componentDidMount() {
    const defaultSearchTags = ["Football", "Guitars", "Computers"]  
    defaultSearchTags.forEach( (searchTag) => {    
      
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => response.json())
        .then(responseData => {
          let array = responseData.photos.photo;
          return array;  
        })
        .then(array => {
          this.setState( { photos: array } )
        })
        .catch( error => {
          console.log("An error happened when fetching the data.", error);
        });

    });
  }


  render() { 
    return (
      <BrowserRouter>
        <div className="container">
        
          <SearchForm />
          <Header />
                  
        <Switch>
          <Route path="/cats" render={ () => <PhotoContainer category="cats" data={this.state.photos} />}/>
          <Route path="/dogs" render={ () => <PhotoContainer category="dogs" data={this.state.photos} />} />
          <Route path="/computers" render={ () => <PhotoContainer category="computers" data={this.state.photos} />} />
          <Route component={NotFound} />
        </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
