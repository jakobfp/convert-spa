import React, { Component } from "react";


class Word extends Component {

  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <h4>2. Select design</h4>
          <select value={this.props.state.design} onChange={this.props.handleDesignChange}>
            <option value=''>select a design</option>
            <option value="htwberlin">HTW Berlin</option>
          </select>
          <h4>3. Convert & Download</h4>
          <input type="submit" value="Do!" />
        </form>
      </div>
    );
  }
}

export default Word;
