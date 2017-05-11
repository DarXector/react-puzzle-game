import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';
import PreGame from './components/pregame/PreGame';
import GameEnd from './components/gameend/GameEnd';
import Game from './components/game/Game';
import Rewards from './components/rewards/Rewards';

import reducers from './reducers';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

function requireCredentials(nextState, replace, next) {

    console.log('nextState', nextState, 'store', store.getState());

    const isLoggedIn = store.getState().userForm.loggedIn,
        pathname = nextState.location.pathname;

    if (pathname != '/' && !isLoggedIn) {
        replace({
            pathname: '/'
        });
        next();
    } else if(pathname == '/' && isLoggedIn) {
        replace({
            pathname: '/pregame'
        });
        next();
    } else {
        next();
    }
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}  onEnter={requireCredentials} />;
        <Route path="/pregame" component={PreGame} onEnter={requireCredentials} />
        <Route path="/game" component={Game} onEnter={requireCredentials} />
        <Route path="/gameend" component={GameEnd} onEnter={requireCredentials}  />
        <Route path="/rewards" component={Rewards} onEnter={requireCredentials}  />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
