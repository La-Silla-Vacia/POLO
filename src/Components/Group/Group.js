import { h, render, Component } from 'preact';
import cx from 'classnames';

const s = require('./Group.css');

export default class Timeline extends Component {
  constructor() {
    super();

    this.state = {}
  }

  render(props, state) {
    const { size, position } = props;

    const style = {
      width: size + 'px',
      height: size + 'px'
    };

    return (
      <div className={cx(
        s.container,
        s[`size-${size}`],
        { [s.inside]: position},
        { [s.outside]: !position}
      )}
      style={style}
      >

      </div>
    );
  }
}