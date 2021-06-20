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
    skylines: [],
    sunsets: [],
    food: []
  }

  // When the component mount, the API data will be fetched using the Fetch API.
  componentDidMount() {
    const defaultSearchTags = ["skylines", "sunsets", "food"]
    defaultSearchTags.forEach( (searchTag) => {    
      
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => response.json())
        .then(responseData => 
          this.setState( { [searchTag]: responseData.photos.photo } ) 
        )
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
          <Route path="/skylines" render={ () => <PhotoContainer category="skylines" data={this.state.skylines} />}/>
          <Route path="/sunsets" render={ () => <PhotoContainer category="sunsets" data={this.state.sunsets} />} />
          <Route path="/food" render={ () => <PhotoContainer category="food" data={this.state.food} />} />
          <Route component={NotFound} />
        </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
