import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {
  state = {loading: true};

  componentDidMount() {
    const { tests } = this.props.data;
    this.setState({ tests, loading: false })
  }
  render() {
    const { tests, loading } = this.state;
    console.info(tests, loading)
    if(loading) {
      return (
        <p>Hleð gögnum..</p>
      )
    }

    return (
      <section className="department">
        <table>
          <thead>
            <tr>
              <td>Auðkenni</td>
              <td>Námskeið</td>
              <td>Fjöldi</td>
              <td>Dagsetning</td>
            </tr>
          </thead>
          <tbody>
          {tests.map((test) => (
            <tr key={test.course}>
              <td key={test.course}>{test.course}</td>
              <td key={test.name}>{test.name}</td>
              <td key={test.students}>{test.students}</td>
              <td key={test.date}>{test.date}</td>

            </tr>
          ))}
          </tbody>
        </table>
      </section>
    );
  }
}
