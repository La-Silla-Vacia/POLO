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
        <svg style={{opacity: 0, pointerEvents: 'none', position: 'absolute'}} id="mySvg" width="110" height="110">
          <defs>
            <pattern id="img_claraLóPez" x="0" y="0" height="100%" width="100%" patternContentUnits="objectBoundingBox" viewBox="0 0 1 1">
              <image x="0" y="0" width="1" height="1" xlinkHref="https://github.com/La-Silla-Vacia/POLO/raw/master/src/images/claraLopez.jpg" />
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