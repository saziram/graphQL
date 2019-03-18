import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
//import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

import { createStore } from 'redux';

 
const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
        state += action.payload;
        break;
        case "SUB":
        state -= action.payload;
        break;
        case "MUL":
        state *= action.payload;
        break;        
    }
    return state;
}

const store = createStore(reducer, 50);

store.subscribe(
    () => {
        console.log("Subscribe when state updated");
        console.log("Updated state: ", store.getState());
    }
);

ReactDOM.render(
    <Provider store={store} > <App /> </Provider>
, document.getElementById('root'));
//serviceWorker.unregister();
