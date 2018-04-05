import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'

import './School.css';
import Department from '../department';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  

  constructor(props) {
    super(props);
    this.state = { data: null, loading: true, error: false, isToggled: false }

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    try {
      const slug = this.props.depName;            
      const data = await this.fetchData(slug);
      console.info(data)
      if(data.error) this.setState({ error: true, loading: false });
      else this.setState({ data, loading: false })
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }
  
  async fetchData(slug) {
    const url = process.env.REACT_APP_SERVICE_URL;
    const response = await fetch(url + slug);
    const data = await response.json();
    return data;
  }

  handleClick = (event, data) => {
    this.setState(prevState => ({
      isToggled: (this.state.depName === data.heading)? !prevState.isToggled : true,      
      depName: data.heading,
    }));
  }

  render() {
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
    const { heading, departments } = this.state.data.school;
    return (
      <section className="school">
        <Helmet>
          <title>{heading} - Próftöflur</title>
        </Helmet>
        <h1>{heading}</h1>
            {departments.map((element) => (
              <div key={element.heading}>
              {(this.state.depName === element.heading && this.state.isToggled) ?
                <p className="school-link" onClick={((e) => this.handleClick(e, element))} key={element.heading}>
                -{element.heading}
                </p>: <p className="school-link" onClick={((e) => this.handleClick(e, element))} key={element.heading}>
                +{element.heading}
                </p>}
                {(this.state.depName === element.heading && this.state.isToggled) ? <Department data={element} /> : <span></span> }
                <div className="school-border"></div>
              </div>
          ))}
        <Link to="/">Heim</Link>
      </section>
    );
  }
}
