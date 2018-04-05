import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {
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
    const response = await fetch(url + 'stats');
    const { stats } = await response.json();
    console.log('stats', stats)
    return stats;
  }

  render() {
    if(!this.state.data) {
      return (
        <p>Loading...</p>
      )
    } else {
      const stats = this.state.data;
    
      return (
        <div className="home">
          <h1 className="stat-title">Tölfræði</h1>
          <div className="stat-field"><p className="stat-name">Minnsti fjöldi nemenda í prófi</p><p>{stats.min}</p></div>
          <div className="stat-field"><p className="stat-name">Mesti fjöldi nemenda í prófi</p><p>{stats.max}</p></div>
          <div className="stat-field"><p className="stat-name">Heildarfjöldi prófa</p><p>{stats.numTests}</p></div>
          <div className="stat-field"><p className="stat-name">FJöldi nemenda</p><p>{stats.numStudents}</p></div>
          <div className="stat-field"><p className="stat-name">Meðalfjöldi nemanda í prófi</p><p>{stats.averageStudents}</p></div>
        </div>
      );
    }
  }
}
