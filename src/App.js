import React, { Component } from 'react';
import logo from './pg.png';
import './App.css';
import ItemsContainer from "./components/ItemsContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
            <ItemsContainer/>
        </div>
      </div>
    );
  }
}

export default App;
