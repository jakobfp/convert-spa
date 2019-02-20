import React, { Component } from "react";
import "../www/css/md.css"

class Slide extends Component {

  constructor(props){
    super(props);

    this.state = {
      id: this.props.currentSlide.id,
      title: this.props.currentSlide.title,
      split: this.props.currentSlide.split,
      col1: this.props.currentSlide.col1,
      col2: this.props.currentSlide.col2
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCol1Change = this.handleCol1Change.bind(this);
    this.handleCol2Change = this.handleCol2Change.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.prepareSlide = this.prepareSlide.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleCol1Change(event) {
    this.setState({col1: event.target.value});
  }

  handleCol2Change(event) {
    this.setState({col2: event.target.value});
  }

  toggleColumn(event) {
    if(this.state.split){
      this.setState({col2: ""});
    }
    this.setState({split: !(this.state.split)});
  }

  prepareSlide(event) {
    let slide = this.state;
    this.props.saveSlide(slide, this.state.id);
  }

  render() {
    return (
      <div id="slidecontent">
        <label>Title</label><br/><input id="content-title" className="slidetitel" type="text" size="35" value={this.state.title} onChange={this.handleTitleChange}/>
        <br/>
        <label>Content</label> <br/>
        <table id="columns">
          <tbody>
            <tr>
              <td><textarea className="slidecol" id="content-col1" value={this.state.col1} onChange={this.handleCol1Change}></textarea></td>
              {this.state.split ?
              (<td><textarea className="slidecol" id="content-col2" value={this.state.col2} onChange={this.handleCol2Change}></textarea></td>) :
              (<td><button className="addButton" onClick={this.toggleColumn}>add column</button></td>)}
              {this.state.split ?
              (<td><button className="addButton addButton--active" onClick={this.toggleColumn}>remove column</button></td>) :
              (<td></td>)}
            </tr>
            <tr>
              <td className="btn-td"><button onClick={this.prepareSlide}>Save</button><button onClick={this.props.cancelSlide}>Cancel</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Slide;
