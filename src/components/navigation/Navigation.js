import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {


  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData() {
    const url = process.env.REACT_APP_SERVICE_URL;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  render(){
    const { data, loading, error } = this.state;
    if(loading){
      return (
          <p>Hleð gögnum..</p>
      );
    }
    if (error) { 
      return (
        <p>Villa við að sækja gögn</p>
      );
    } 
    let dep = null;
    if(data) dep = data.schools;
    return (
      <nav className="navigation">
      <NavLink to="/" className="nav-title">Próftöflur</NavLink>
      <ul className="nav-bar">
        {dep.map((element) => (
          <li className="nav-link" key={element.slug}>
            <NavLink to={element.slug} className="nav-dep">{element.name}</NavLink>
          </li>
        ))}
        </ul>
      </nav>
    );
    
  }
}
