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

  componentWillMount() {
    fetch('https://lsv-data-visualizations.firebaseio.com/moving-of-politics.json')
      .then((response) => {
        return response.json()
      }).then((json) => {
      // console.log('parsed json', json);
      const groups = [];
      json.map((item, index) => {

        const group = {
          name: item.group,
          2005: {
            size: item.groupsize2005,
            position: item.position2005
          },
          2009: {
            size: item.groupsize2009,
            position: item.position2009
          },
          2011: {
            size: item.groupsize2011,
            position: item.position2011
          },
          2017: {
            size: item.groupsize2017,
            position: item.position2017
          },
          explanation: item.explanation
        };
        groups.push(group);
      });

      this.setState({ groups });
      // this.createGroups();
      this.updateChart()
      console.log(groups);
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  componentDidMount() {
    this.svg = d3.select("#lsvi-graphic-inner svg");
    this.setState({ width: this.props.meta.width(), height: 500 })
  }

  updateChart() {
    const { width, height, year, groups } = this.state;

    // Format the date for our graph
    this.nodes = groups.map((item) => {
      // get the data of the correct year
      const currentYearData = item[year];
      const category = currentYearData.position,
        radius = this.getSize(currentYearData.size),
        d = { cluster: category, radius: radius, name: item.name };
      if (!clusters[category] || (radius > clusters[category].radius)) clusters[category] = d;
      return d;
    });

    const force = d3.layout.force()
      .nodes(this.nodes)
      .size([width, height])
      .gravity(.02)
      .charge(0)
      .on("tick", tick)
      .start();

    const circle = this.svg.selectAll("circle")
      .data(this.nodes)
      .enter()
      .append("circle")
      .attr("r", function (d) {
        return d.radius;
      })
      .attr("title", (d) => {
        return d.name;
      })
      .style("fill", function (d) {
        return color(d.cluster);
      })
      .call(force.drag);

    function tick(e) {
      circle
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y;
        });
    }

    const nodes = this.nodes

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
  }

  getSize(scale) {
    switch (scale) {
      case 1:
        return 40;
        break;
      case 2:
        return 45;
        break;
      case 3:
        return 50;
        break;
      case 4:
        return 55;
        break;
      case 5:
        return 65;
        break;
      default:
        return 10
    }
  }

  getGroups() {
    const { groups, year } = this.state;
    return groups.map((group, index) => {
      let position = true;
      if (group[year].position === 'Outside') {
        position = false;
      }

      const diameter = this.getSize(group[year].size);

      const data = {
        name: group.name,
        size: diameter,
        position
      };
      return (
        <Group {...data} />
      )
    });
  }

  changeYear(year) {
    this.setState({ year });
    // this.createGroups();
    this.updateChart()
    return;


    let i = 0,
      j = 0;
    const circle = svg.selectAll("circle")
      .data(this.nodes)
      .attr("r", (d) => {
        const node = nodes[i];
        i++;
        if (!node) {
          return 10
        }
        return node.radius;
      })
      .style("fill", function (d) {
        const node = nodes[j];
        j++;
        if (!node) return 'grey';
        return color(node.cluster);
      })
      .transition()
      .duration(300);

    // function tick(e) {
    //   circle
    //     .each(cluster(10 * e.alpha * e.alpha))
    //     .each(collide(.5))
    //     .attr("cx", (d) => {
    //       return d.x;
    //     })
    //     .attr("cy", (d) => {
    //       return d.y;
    //     });
    // }


    // const circle = svg.selectAll("circle")
    //   .data(nodes)
    //   .enter()
    //   .append("circle")
    //   .attr("r", function (d) {
    //     console.log('asdf');
    //     return d.radius;
    //   })
    //   .attr("title", (d) => {
    //     return d.name;
    //   })
    //   .style("fill", function (d) {
    //     console.log('asf');
    //     return color(d.cluster);
    //   })
    //   .call(force.drag);

    // function tick(e) {
    //   circle
    //     .each(cluster(10 * e.alpha * e.alpha))
    //     .each(collide(.5))
    //     .attr("cx", function (d) {
    //       return d.x;
    //     })
    //     .attr("cy", function (d) {
    //       return d.y;
    //     });
    // }
  }

  render(props, state) {
    const groups = this.getGroups();

    return (
      <div className={s.container}>
        <div id="lsvi-graphic-inner" className={s.groups}>
          <svg width={this.state.width} height={this.state.height} />
        </div>
        <Timeline callback={this.changeYear} current={state.year} />
      </div>
    )
  }
}