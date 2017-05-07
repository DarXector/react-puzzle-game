import React, { PropTypes, Component } from 'react';
import { RouteTransition } from 'react-router-transition';

import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  render() {

      const { children, location } = this.props;

      return (
          <div className="container">
              <Header />
              <RouteTransition
                  pathname={location.pathname}
                  className="transition-wrapper"
                  atEnter={{ opacity: 0 }}
                  atLeave={{ opacity: 0 }}
                  atActive={{ opacity: 1 }} >
                  {children}
              </RouteTransition>
              <Footer />
          </div>
      );
  }
}

App.propTypes = { children: PropTypes.object, location: PropTypes.object };

export default App;
