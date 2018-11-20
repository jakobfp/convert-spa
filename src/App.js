import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

import Home from "./components/Home";
import About from "./components/About";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
