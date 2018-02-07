import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer.js';
import {Route, withRouter} from 'react-router-dom';

class App extends Component {
  home() {
    this.props.history.push('/');
  }
  nyc() {
    this.props.history.push('/map/nyc');
  }
  raleigh() {
    this.props.history.push('/map/raleigh');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} onClick={this.home.bind(this)} className="App-logo" alt="logo" />
          <div onClick={this.nyc.bind(this)}>NYC</div>
          <div onClick={this.raleigh.bind(this)}>Raleigh</div>
        </header>
        <Route path="/map/:city" component={MapContainer} />
        
      </div>
    );
  }
}

export default withRouter(App);
