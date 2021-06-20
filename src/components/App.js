import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
    dogs: [],
    query: [],
    loading: true,
  }

  fetchData = (query, standardPictures) => {
    this.setState({ loading: true });
    
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData =>
        standardPictures ?
          this.setState({ [query]: responseData.photos.photo }) 
          :
          this.setState({ 
            query: responseData.photos.photo,
            loading: false
          })  
      )
      .catch( error => {
        console.log("An error happened when fetching the data.", error);
      });
  }
  
  // When the component mount, the API data will be fetched using the Fetch API.
  componentDidMount() {
    const defaultSearchTags = ["skylines", "sunsets", "dogs"];
    defaultSearchTags.forEach( searchTag => this.fetchData(searchTag, true) ); 
    this.setState({ loading: false });
    
    if ( this.state.skylines.length * this.state.sunsets.length * this.state.dogs.length > 0 ) {
      this.setState({ loading: false });
    }  
  }

  render() { 
    return (
      <BrowserRouter>
        <div className="container">
        
          <SearchForm onSearch={this.fetchData} />
          <Header />
          
          { this.state.skylines.length * this.state.sunsets.length * this.state.dogs.length === 0 || this.state.loading ?
            <h2> Loading </h2>
            :
            <Switch>
              <Route exact path="/"> <Redirect to="/skylines" /> </Route>
              <Route path="/skylines" component={ () => <PhotoContainer category="skylines" data={this.state.skylines} />} />
              <Route path="/sunsets" component={ () => <PhotoContainer category="sunsets" data={this.state.sunsets} />} />
              <Route path="/dogs" component={ () => <PhotoContainer category="dogs" data={this.state.dogs} />} />
              <Route path="/search/:query" component={ ( {match} ) => <PhotoContainer category="" data={this.state.query} query={match.params.query} />} />
              <Route component={NotFound} /> 
            </Switch>  
          }

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
