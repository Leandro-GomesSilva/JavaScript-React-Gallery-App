// Importing React related libraries and objects
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Importing the API Key
import apiKey from '../config';

// Importing components
import SearchForm from './SearchForm';
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';

// The App Component is declared as a Class Component because it has State.
class App extends Component {
  
  // Defining the State variables
  state = {
    skylines: [],
    sunsets: [],
    dogs: [],
    query: [],
    searchTag: "",
    loading: true,
  }

  // This method fetches data from the Flickr API.
  fetchData = (query, standardPictures) => {
    this.setState({ loading: true });
    
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData =>
        standardPictures ?      // In order to handle if the Fetch belongs to the three pre-determined categories or comes from the Search Form, this ternary operator evaluates the boolean variable 'standardPictures'
          this.setState({ [query]: responseData.photos.photo }) 
          :
          this.setState({ 
            query: responseData.photos.photo,   // Saves the fetch data on State
            searchTag: query,   // Saves the custom search tag on State, in order to evaluate if a page on reload needs to be re-fetched
            loading: false      // Sets 'loading' to false, after writing the query array with the fetched data
          })  
      )
      .catch( error => {
        console.log("An error happened when fetching the data.", error);    // An standard error message for the Fetch API
      });
  }
  
  // After the component mounts, the API data will be fetched for the three standard categories.
  componentDidMount() {
    const defaultSearchTags = ["skylines", "sunsets", "dogs"];
    defaultSearchTags.forEach( searchTag => this.fetchData(searchTag, true) ); 
    this.setState({ loading: false });
  }

  render() { 
    return (
      <BrowserRouter>
        <div className="container">
        
          <SearchForm onSearch={this.fetchData} />
          <Header />
          
          {/* This ternary operator evaluates with the app is ready to mount the PhotoContainer, 
              i.e. if the State 'loading' was set to true and if the data arrays of the three standard categories are populated with data. */}

          { this.state.skylines.length * this.state.sunsets.length * this.state.dogs.length === 0 || this.state.loading ?
            <h2 className="loading"> Loading... </h2>     // In case the data is not ready, the user sees a 'Loading' indicator
            :
            <Switch>
              <Route exact path="/"> <Redirect to="/skylines" /> </Route>
              <Route path="/skylines" component={ () => <PhotoContainer category="skylines" data={this.state.skylines} />} />
              <Route path="/sunsets" component={ () => <PhotoContainer category="sunsets" data={this.state.sunsets} />} />
              <Route path="/dogs" component={ () => <PhotoContainer category="dogs" data={this.state.dogs} />} />
              <Route path="/search/:query" component={ ( {match} ) => <PhotoContainer category="" data={this.state.query} query={match.params.query} reFetchData={this.fetchData} searchTag={this.state.searchTag} />} />
              <Route component={NotFound} /> 
            </Switch>  
          }

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
