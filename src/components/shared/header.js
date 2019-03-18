import React, { Component } from 'react';
import './styles.css';
import logo from './../../logo.svg';

class Header extends Component {
  render() {
    return (
      <div>  
        <header className="App-header">
          <img className="App-logo" src={logo} />
          <span className="App-header-font">React Sample</span>
        </header>
      </div>
    );
  }
}

export default Header;
