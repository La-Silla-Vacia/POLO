import { h, render, Component } from 'preact';
import * as d3 from "d3";

import Group from './Components/Group/Group';
import Timeline from './Components/Timeline/Timeline';

import s from './base.css';

// const claraLopez = require('./images/claraLopez.jpg');


export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      groups: [],
      year: 2005
    };

    this.changeYear = this.changeYear.bind(this);
  }

  changeYear(year) {
    this.setState({ year });
    this.props.callback(year);
  }

  render(props, state) {

    return (
      <div className={s.container}>
        <svg style={{opacity: 0, pointerEvents: 'none', position: 'absolute'}} id="mySvg" width="80" height="80">
          <defs id="mdef">
            <pattern id="image" x="0" y="0" height="100" width="100">
              <image x="0" y="0" width="100" height="100" xlinkHref="http://www.e-pint.com/epint.jpg" />
            </pattern>
          </defs>
        </svg>
        <div id="lsvi-base" data-balloon="Whats up!" data-balloon-pos="left">
          <button id="btn" type="button" value="Add node">Change year</button>
        </div>
        <Timeline callback={this.changeYear} current={state.year} />
      </div>
    )
  }
}