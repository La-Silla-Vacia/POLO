import { h, render, Component } from 'preact';
import cx from 'classnames';

const s = require('./Timeline.css');

export default class Timeline extends Component {
  constructor() {
    super();

    this.state = {}
  }

  handleClick(year) {
    this.props.callback(year);
  }

  render(props, state) {
    const {current} = props;
    return (
      <div className={s.container}>
        <button
          className={cx(s.button, {[s.current]: current === 2005 })}
          onClick={this.handleClick.bind(this, 2005)}>
          2005
        </button>
        <button
          className={cx(s.button, {[s.current]: current === 2009 })}
          onClick={this.handleClick.bind(this, 2009)}>
          2009
        </button>
        <button
          className={cx(s.button, {[s.current]: current === 2011 })}
          onClick={this.handleClick.bind(this, 2011)}>
          2011
        </button>
        <button
          className={cx(s.button, {[s.current]: current === 2017 })}
          onClick={this.handleClick.bind(this, 2017)}>
          2017
        </button>
      </div>
    );
  }
}