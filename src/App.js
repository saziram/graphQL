import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Sales from './components/sales';
import Books from './components/books';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/books" exact />
          <Route path="/books" component={Books} />
          <Route path="/sales" component={Sales} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myState : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setValue : (value) => {
        dispatch({
            type : "ADD",
            payload : value 
        });
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
