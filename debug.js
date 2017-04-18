/*global require,console*/

var lsv = require('lsv-interactive');
import { h, render } from 'preact';
import Base from './src/base';

import script from './src/script.js';

require("./src/base.css"); // this goes outside the callback since otherwise the interactive sometimes fires before the CSS is fully loaded
require("./src/global.css");

lsv("moving-of-politics", function (interactive) {
  "use strict";

  if (!interactive) {
    console.log("Interactive moving-of-politics not initiated. Exiting.");
    return;
  }

  //MARKUP
  render((
    <Base callback={changeYear} meta={interactive} />
  ), interactive.el);
  // interactive.el.innerHTML = require("./src/base.html")();

  function changeYear(year) {
    console.log('abc', year);
  }

  new script();
}, true); // change this last param to true if you want to skip the DOM checks