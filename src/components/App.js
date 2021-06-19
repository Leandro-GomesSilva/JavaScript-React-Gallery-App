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

  }

  render() { 
    return (
      <BrowserRouter>
        <div className="container">
        
          <SearchForm />
          <Header />
                  
        <Switch>
          <Route path="/cats" render={ () => <PhotoContainer category="cats"/>} />
          <Route path="/dogs" render={ () => <PhotoContainer category="dogs"/>} />
          <Route path="/computers" render={ () => <PhotoContainer category="computers"/>} />
          <Route component={NotFound} />
        </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
