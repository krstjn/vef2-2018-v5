import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
  render() {
    const CurrentDepartment = (props) => {
      return (
        <School 
          depName={props.match.params.department}
          {...props}
        />
      );
    }
    return (
      <main className="app">
          <Helmet>
                <meta charSet="utf-8" />
                <title>Próftölfur</title>
            </Helmet>
        <div className="header">
          <Navigation />
        </div>
        <section>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:department" name="{:department}" component={CurrentDepartment} />
          <Route component={NotFound} />
        </Switch>
      </section>
      </main>
    );
  }
}

export default App;
