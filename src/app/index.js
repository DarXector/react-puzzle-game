import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';
import PreGame from './components/pregame/PreGame';
import GameEnd from './components/gameend/GameEnd';
import Game from './components/game/Game';

import reducers from './reducers';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />;
        <Route path="/pregame" component={PreGame} />
        <Route path="/game" component={Game} />
        <Route path="/gameend" component={GameEnd} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
