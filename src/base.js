import { h, render, Component } from 'preact';
import * as d3 from "d3";

import Group from './Components/Group/Group';
import Timeline from './Components/Timeline/Timeline';

import s from './base.css';

const clusters = new Array(3),
  padding = 1.5, // separation between same-color circles
  clusterPadding = 6, // separation between different-color circles
  maxRadius = 12,

  insideColor = 'blue',
  outsideColor = 'red',
  goneColor = 'grey';

const color = d3.scale.category10()
  .domain(d3.range(3));

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  return function (d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x,
      y = d.y - cluster.y,
      l = Math.sqrt(x * x + y * y),
      r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
}


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
        <div id="lsvi-base">
          <button id="btn" type="button" value="Add node">Change year</button>
        </div>
        <Timeline callback={this.changeYear} current={state.year} />
      </div>
    )
  }
}