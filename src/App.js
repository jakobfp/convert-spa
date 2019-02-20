import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faTimes } from '@fortawesome/free-solid-svg-icons'

import Home from "./components/Home";
import About from "./components/About";
import {MarkdownToBeamer, MarkdownToBeamerHeader} from "./components/Markdown-Presentation.js";

library.add(faCheckSquare, faTimes)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/mdpres">Markdown Presentation</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route exact path="/mdpres" component={MarkdownToBeamerHeader}/>
            <Route exact path="/about" component={About}/>
          </div>
          <div>
            <Route exact path="/mdpres" component={MarkdownToBeamer}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
